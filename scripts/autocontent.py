import os
import shutil
import uuid
from google import genai
from PIL import Image, ImageDraw, ImageFont
import requests
import json
import textwrap
from dotenv import load_dotenv
import time

# --- KONFIGURASI ---
load_dotenv()

GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY') or os.getenv('GEMINI_API_KEY')
FB_PAGE_ID = os.getenv('FB_PAGE_ID')
IG_USER_ID = os.getenv('IG_USER_ID')
ACCESS_TOKEN = os.getenv('ACCESS_TOKEN')
WEBSITE_BASE_URL = os.getenv('WEBSITE_BASE_URL')
API_VERSION = "v21.0" 

if not all([GOOGLE_API_KEY, FB_PAGE_ID, IG_USER_ID, ACCESS_TOKEN, WEBSITE_BASE_URL]):
    print("Error: Pastikan semua environment variables (termasuk WEBSITE_BASE_URL) sudah diatur.")
    exit()

# --- Pengaturan Path ---
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
PUBLIC_DIR = os.path.join(PROJECT_ROOT, 'public', 'generated-content')

os.makedirs(PUBLIC_DIR, exist_ok=True)

FONT_PATH = os.path.join(SCRIPT_DIR, 'Poppins-Bold.ttf')
FONT_PATH_REGULAR = os.path.join(SCRIPT_DIR, 'Poppins-Regular.ttf')  # Font untuk teks biasa
TEMPLATE_IMAGE_PATH = os.path.join(SCRIPT_DIR, 'template.png')
FONT_SIZE = 80
FONT_SIZE_SMALL = 36  # Font size untuk website URL (diperbesar dari 24)
FONT_SIZE_CONTENT = 48  # Font size untuk konten deskripsi (diperbesar dari 36)
TEXT_COLOR = (20, 33, 61)
WEBSITE_COLOR = (100, 100, 100)  # Warna abu untuk website URL

# Fungsi untuk mendapatkan font dengan fallback
def get_font(font_path, font_size):
    """
    Mencoba membuka font, jika gagal gunakan font default sistem
    """
    try:
        if os.path.exists(font_path):
            return ImageFont.truetype(font_path, font_size)
        else:
            print(f"Peringatan: Font {font_path} tidak ditemukan, menggunakan font default")
            return ImageFont.load_default()
    except Exception as e:
        print(f"Peringatan: Gagal memuat font {font_path}: {e}, menggunakan font default")
        try:
            # Coba gunakan font sistem yang umum
            return ImageFont.truetype("/System/Library/Fonts/Arial.ttf", font_size)
        except:
            return ImageFont.load_default()

def check_required_files():
    """
    Memeriksa keberadaan file yang diperlukan
    """
    print("\n--- Memeriksa File Yang Diperlukan ---")
    
    files_to_check = {
        'Template Image': TEMPLATE_IMAGE_PATH,
        'Font Bold': FONT_PATH,
        'Font Regular': FONT_PATH_REGULAR,
        'Ending Image': os.path.join(PUBLIC_DIR, 'ending.png')
    }
    
    missing_files = []
    for name, path in files_to_check.items():
        exists = os.path.exists(path)
        status = "✓ Ada" if exists else "✗ Tidak ada"
        print(f"{name}: {path} - {status}")
        
        if not exists:
            missing_files.append((name, path))
    
    if missing_files:
        print(f"\nPeringatan: {len(missing_files)} file tidak ditemukan:")
        for name, path in missing_files:
            print(f"  - {name}: {path}")
        
        # Saran untuk file yang hilang
        if any('Font' in name for name, _ in missing_files):
            print("\nSaran untuk font:")
            print("  - Download Poppins font dari Google Fonts")
            print("  - Atau script akan menggunakan font sistem default")
        
        if any('ending.png' in path for _, path in missing_files):
            print("\nSaran untuk ending.png:")
            print("  - Buat file ending.png dan letakkan di public/generated-content/")
            print("  - Atau slide ending akan dilewati")
            
    return len(missing_files) == 0

def get_content_idea():
    """
    Membaca keywords dari file JSON, menggunakan keyword pertama, merotasinya,
    lalu meminta ide konten dari Gemini berdasarkan keyword tersebut.
    """
    keywords_path = os.path.join(SCRIPT_DIR, 'ig-keywords.json')
    
    try:
        print(f"Membaca keywords dari: {keywords_path}")
        with open(keywords_path, 'r', encoding='utf-8') as f:
            all_keywords = json.load(f)

        if not all_keywords:
            print("Peringatan: File keywords.json kosong. Menggunakan topik default.")
            keyword_to_use = "alasan kenapa bisnis perlu website"
            # Return a valid structure even with a default keyword
            return get_content_from_gemini(keyword_to_use), all_keywords
        
        # Ambil keyword pertama dari array
        keyword_to_use = all_keywords.pop(0)

        # Pindahkan keyword yang sudah dipakai ke akhir array
        all_keywords.append(keyword_to_use)

        print(f"Menggunakan keyword: \"{keyword_to_use}\"")
        
        content = get_content_from_gemini(keyword_to_use)
        
        # Return konten yang dihasilkan dan array keywords yang sudah dirotasi
        return content, all_keywords

    except FileNotFoundError:
        print(f"Error: File 'keywords.json' tidak ditemukan. Menggunakan topik default.")
        return get_fallback_content(), []
    except (json.JSONDecodeError, IndexError) as e:
        print(f"Error saat memproses 'keywords.json': {e}. Menggunakan topik default.")
        return get_fallback_content(), []



def get_content_from_gemini(keyword):
    """
    Fungsi terpisah untuk memanggil Gemini dengan satu keyword.
    """
    print("Meminta ide konten dari Gemini 2.0 Flash...")
    try:
        client = genai.Client()
        prompt = f"""
        Anda adalah seorang ahli strategi media sosial untuk agensi "Jasa Bikin Aplikasi dan Website Jogja".
        Buat satu ide konten menarik untuk carousel Instagram (3-5 slide).
        Topiknya harus seputar "{keyword}".

        PENTING: Berikan respons HANYA dalam format JSON yang valid, tanpa karakter khusus atau kontrol karakter.

        Format JSON yang diperlukan:
        {{
          "judul_gambar": "Teks singkat dan menarik untuk slide pertama. Maksimal 8 kata.",
          "cta_swipe": "Call-to-action pendek untuk swipe, contoh: Swipe untuk tips lengkap!",
          "konten_slides": [
            "Penjelasan detail poin pertama dalam 3-6 kalimat yang menjelaskan aspek dari judul. Berikan insight mendalam dan praktis.",
            "Penjelasan detail poin kedua dalam 3-6 kalimat yang melanjutkan pembahasan judul. Sertakan tips atau fakta menarik.",
            "Penjelasan detail poin ketiga dalam 3-6 kalimat yang mengakhiri pembahasan judul dengan actionable advice atau kesimpulan kuat."
          ],
          "caption_sosmed": "Caption lengkap maksimal 2000 karakter untuk postingan media sosial. Sertakan hook, isi, call-to-action untuk mengunjungi bikinwebsitejogja.com, dan beberapa hashtag relevan seperti #jasabikinwebsite #websitejogja #digitalmarketing #umkmjogja."
        }}
        """        
        response = client.models.generate_content(model='gemini-2.0-flash', contents=prompt)
        
        # ... (Logika pembersihan dan parsing JSON tetap sama) ...
        # (Sertakan kembali kode lengkap dari fungsi get_content_idea Anda di sini)
        raw_response = response.text
        cleaned_response = raw_response.replace("```json", "").replace("```", "").strip()
        import re
        cleaned_response = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f]', '', cleaned_response)
        cleaned_response = re.sub(r'\s+', ' ', cleaned_response)
        
        try:
            return json.loads(cleaned_response)
        except json.JSONDecodeError as je:
            print(f"JSON decode error: {je}")
            json_match = re.search(r'\{.*\}', cleaned_response, re.DOTALL)
            if json_match:
                json_str = json_match.group(0)
                return json.loads(json_str)
            else:
                print("Could not extract valid JSON from response")
                return get_fallback_content()
                
    except Exception as e:
        print(f"Error saat mengambil ide dari Gemini: {e}")
        return get_fallback_content()


def get_fallback_content():
    """
    Konten fallback jika Gemini gagal
    """
    print("Menggunakan konten fallback...")
    return {
        "judul_gambar": "Website Profesional untuk Bisnis Anda",
        "cta_swipe": "Swipe untuk tips lengkap!",
        "konten_slides": [
            "Website adalah wajah digital bisnis modern yang tidak bisa diabaikan. Di era digital ini, pelanggan akan mencari tahu tentang bisnis Anda secara online sebelum memutuskan untuk membeli. Tanpa website, Anda kehilangan kesempatan untuk memberikan kesan pertama yang profesional dan terpercaya. Website yang baik akan membangun kredibilitas dan membuat bisnis Anda terlihat established di mata calon pelanggan.",
            
            "Website yang responsif dan mobile-friendly sangat penting karena lebih dari 60% pengunjung mengakses internet melalui smartphone. Dengan website yang mudah diakses kapan saja dan di mana saja, pelanggan dapat mencari informasi produk, layanan, dan kontak bisnis Anda 24/7. Ini memberikan kenyamanan bagi pelanggan dan meningkatkan peluang penjualan bahkan ketika Anda sedang tidak online.",
            
            "Website yang dioptimasi SEO akan membantu bisnis Anda muncul di halaman pertama Google ketika calon pelanggan mencari produk atau layanan yang Anda tawarkan. Dengan strategi konten yang tepat dan struktur website yang baik, Anda bisa mengalahkan kompetitor dan menarik lebih banyak pelanggan organik. Investasi website adalah investasi jangka panjang yang akan terus memberikan hasil untuk pertumbuhan bisnis Anda."
        ],
        "caption_sosmed": "💡 Kenapa bisnis modern WAJIB punya website?\n\n✅ Meningkatkan kredibilitas bisnis\n✅ Memperluas jangkauan pelanggan\n✅ Buka 24/7 tanpa batas waktu\n✅ Mudah ditemukan di Google\n\nJangan sampai kompetitor Anda lebih dulu online!\n\n🚀 Konsultasi GRATIS sekarang di bikinwebsitejogja.com\n\n#jasabikinwebsite #websitejogja #digitalmarketing #umkmjogja #websitebisnis #jasapembuatanwebsite #digitalagency #onlinebusiness"
    }

def generate_title_slide(title_text, cta_text, template_path, output_path):
    """
    Membuat slide pertama dengan judul utama, CTA swipe, dan website URL
    """
    print(f"Membuat slide judul di: {output_path}")
    
    # Debug: Periksa keberadaan file
    print(f"Memeriksa template: {template_path} - {'Ada' if os.path.exists(template_path) else 'Tidak ada'}")
    print(f"Memeriksa font bold: {FONT_PATH} - {'Ada' if os.path.exists(FONT_PATH) else 'Tidak ada'}")
    print(f"Memeriksa font regular: {FONT_PATH_REGULAR} - {'Ada' if os.path.exists(FONT_PATH_REGULAR) else 'Tidak ada'}")
    
    try:
        img = Image.open(template_path).convert("RGB")
        draw = ImageDraw.Draw(img)
        
        # Font untuk judul dengan fallback
        font_title = get_font(FONT_PATH, FONT_SIZE)
        font_cta = get_font(FONT_PATH, FONT_SIZE_CONTENT)
        font_website = get_font(FONT_PATH_REGULAR, FONT_SIZE_SMALL)
        
        # Hitung lebar karakter rata-rata untuk wrapping
        try:
            avg_char_width = sum(font_title.getlength(c) for c in 'abcdefghijklmnopqrstuvwxyz') / 26
        except:
            # Fallback jika getlength tidak ada (font default)
            avg_char_width = FONT_SIZE * 0.6
        
        max_chars_per_line = int((img.width * 0.8) / avg_char_width) if avg_char_width > 0 else 20
        
        # Wrap teks judul
        wrapped_title = textwrap.fill(title_text, width=max_chars_per_line)
        
        # Posisi judul (lebih ke tengah)
        title_bbox = draw.textbbox((0, 0), wrapped_title, font=font_title, align='center')
        title_width, title_height = title_bbox[2] - title_bbox[0], title_bbox[3] - title_bbox[1]
        title_x = (img.width - title_width) / 2
        title_y = img.height * 0.35  # Dipindah dari 0.25 ke 0.35 (lebih ke tengah)
        
        draw.text((title_x, title_y), wrapped_title, font=font_title, fill=TEXT_COLOR, align='center')
        
        # Posisi CTA (sedikit turun)
        cta_bbox = draw.textbbox((0, 0), cta_text, font=font_cta, align='center')
        cta_width = cta_bbox[2] - cta_bbox[0]
        cta_x = (img.width - cta_width) / 2
        cta_y = img.height * 0.65  # Dipindah dari 0.55 ke 0.65
        
        draw.text((cta_x, cta_y), cta_text, font=font_cta, fill=TEXT_COLOR, align='center')
        
        # Website URL (bagian bawah dengan font lebih besar)
        website_text = "www.bikinwebsitejogja.com"
        website_bbox = draw.textbbox((0, 0), website_text, font=font_website)
        website_width = website_bbox[2] - website_bbox[0]
        website_x = (img.width - website_width) / 2
        website_y = img.height * 0.85  # Tetap di 85% dari atas
        
        draw.text((website_x, website_y), website_text, font=font_website, fill=WEBSITE_COLOR, align='center')
        
        img.save(output_path)
        return True
    except Exception as e:
        print(f"Error saat membuat slide judul: {e}")
        return False

def generate_content_slide(content_text, slide_number, template_path, output_path):
    """
    Membuat slide konten dengan penjelasan
    """
    print(f"Membuat slide konten {slide_number} di: {output_path}")
    
    # Debug: Periksa keberadaan file (hanya untuk slide pertama untuk menghindari spam)
    if slide_number == 1:
        print(f"Memeriksa template: {template_path} - {'Ada' if os.path.exists(template_path) else 'Tidak ada'}")
    
    try:
        img = Image.open(template_path).convert("RGB")
        draw = ImageDraw.Draw(img)
        
        # Font dengan fallback
        font_content = get_font(FONT_PATH_REGULAR, FONT_SIZE_CONTENT)
        font_website = get_font(FONT_PATH_REGULAR, FONT_SIZE_SMALL)
        
        # Hitung lebar karakter rata-rata untuk wrapping
        try:
            avg_char_width = sum(font_content.getlength(c) for c in 'abcdefghijklmnopqrstuvwxyz') / 26
        except:
            # Fallback jika getlength tidak ada (font default)
            avg_char_width = FONT_SIZE_CONTENT * 0.6
            
        max_chars_per_line = int((img.width * 0.90) / avg_char_width) if avg_char_width > 0 else 35  # Lebih lebar dan lebih banyak karakter
        
        # Wrap teks konten
        wrapped_content = textwrap.fill(content_text, width=max_chars_per_line)
        
        # Posisi konten (di tengah dengan margin lebih kecil)
        content_bbox = draw.textbbox((0, 0), wrapped_content, font=font_content, align='center')
        content_width, content_height = content_bbox[2] - content_bbox[0], content_bbox[3] - content_bbox[1]
        content_x = (img.width - content_width) / 2
        content_y = (img.height - content_height) / 2 - 30  # Sedikit ke atas untuk memberi ruang website URL
        
        draw.text((content_x, content_y), wrapped_content, font=font_content, fill=TEXT_COLOR, align='center')
        
        # Website URL (bagian bawah dengan font lebih besar)
        website_text = "www.bikinwebsitejogja.com"
        website_bbox = draw.textbbox((0, 0), website_text, font=font_website)
        website_width = website_bbox[2] - website_bbox[0]
        website_x = (img.width - website_width) / 2
        website_y = img.height * 0.9  # 90% dari atas
        
        draw.text((website_x, website_y), website_text, font=font_website, fill=WEBSITE_COLOR, align='center')
        
        img.save(output_path)
        return True
    except Exception as e:
        print(f"Error saat membuat slide konten {slide_number}: {e}")
        return False

def create_carousel_images(content_data):
    """
    Membuat semua gambar untuk carousel
    """
    carousel_id = str(uuid.uuid4())
    image_paths = []
    image_urls = []
    
    # 1. Slide pertama (judul)
    title_filename = f"carousel-{carousel_id}-title.png"
    title_local_path = os.path.join(SCRIPT_DIR, title_filename)
    
    success = generate_title_slide(
        title_text=content_data['judul_gambar'],
        cta_text=content_data['cta_swipe'],
        template_path=TEMPLATE_IMAGE_PATH,
        output_path=title_local_path
    )
    
    if success:
        title_public_path = os.path.join(PUBLIC_DIR, title_filename)
        shutil.move(title_local_path, title_public_path)
        title_url = f"{WEBSITE_BASE_URL.rstrip('/')}/generated-content/{title_filename}"
        image_paths.append(title_public_path)
        image_urls.append(title_url)
    
    # 2. Slide konten (2-4)
    for i, content_text in enumerate(content_data['konten_slides'], 1):
        content_filename = f"carousel-{carousel_id}-content-{i}.png"
        content_local_path = os.path.join(SCRIPT_DIR, content_filename)
        
        success = generate_content_slide(
            content_text=content_text,
            slide_number=i,
            template_path=TEMPLATE_IMAGE_PATH,
            output_path=content_local_path
        )
        
        if success:
            content_public_path = os.path.join(PUBLIC_DIR, content_filename)
            shutil.move(content_local_path, content_public_path)
            content_url = f"{WEBSITE_BASE_URL.rstrip('/')}/generated-content/{content_filename}"
            image_paths.append(content_public_path)
            image_urls.append(content_url)
    
    # 3. Slide terakhir (ending.png)
    ending_path = os.path.join(PUBLIC_DIR, "ending.png")
    if os.path.exists(ending_path):
        ending_url = f"{WEBSITE_BASE_URL.rstrip('/')}/generated-content/ending.png"
        image_paths.append(ending_path)
        image_urls.append(ending_url)
    else:
        print(f"Peringatan: File ending.png tidak ditemukan di {ending_path}")
    
    return image_paths, image_urls

def post_carousel_to_instagram(image_urls, caption):
    """
    Mengunggah carousel ke Instagram menggunakan alur multi-media
    """
    print(f"Mengunggah carousel ke Instagram dengan {len(image_urls)} gambar")
    
    headers = {
        'Authorization': f'Bearer {ACCESS_TOKEN}',
        'Content-Type': 'application/json'
    }

    # LANGKAH 1: Buat kontainer untuk setiap gambar
    media_ids = []
    
    for i, image_url in enumerate(image_urls, 1):
        print(f"Membuat kontainer media {i}/{len(image_urls)}...")
        
        create_container_url = f"https://graph.facebook.com/{API_VERSION}/{IG_USER_ID}/media"
        container_payload = {
            'image_url': image_url,
            'is_carousel_item': True
        }
        
        r = requests.post(create_container_url, headers=headers, json=container_payload)
        
        if r.status_code != 200:
            print(f"Error saat membuat container untuk gambar {i}: {r.json()}")
            return False
        
        media_id = r.json()['id']
        media_ids.append(media_id)
        print(f"Kontainer media {i} berhasil dibuat. ID: {media_id}")
        
        # Delay kecil antar request
        time.sleep(1)
    
    # LANGKAH 2: Buat kontainer carousel
    print("Membuat kontainer carousel...")
    carousel_container_url = f"https://graph.facebook.com/{API_VERSION}/{IG_USER_ID}/media"
    carousel_payload = {
        'media_type': 'CAROUSEL',
        'children': ','.join(media_ids),
        'caption': caption
    }
    
    r = requests.post(carousel_container_url, headers=headers, json=carousel_payload)
    
    if r.status_code != 200:
        print(f"Error saat membuat carousel container: {r.json()}")
        return False
    
    carousel_id = r.json()['id']
    print(f"Kontainer carousel berhasil dibuat. ID: {carousel_id}")
    
    # Tunggu sebentar agar Instagram memproses
    print("Menunggu 10 detik untuk memastikan carousel siap...")
    time.sleep(10)
    
    # LANGKAH 3: Publikasikan carousel
    publish_url = f"https://graph.facebook.com/{API_VERSION}/{IG_USER_ID}/media_publish"
    publish_payload = {
        'creation_id': carousel_id
    }
    
    print("Mempublikasikan carousel...")
    r = requests.post(publish_url, headers=headers, json=publish_payload)
    
    if r.status_code == 200:
        print("Carousel berhasil dipublikasikan ke Instagram!")
        return True
    else:
        print(f"Error saat mempublikasikan carousel ke Instagram: {r.json()}")
        return False

def post_to_facebook(image_urls, caption):
    """
    Post carousel ke Facebook (menggunakan gambar pertama sebagai representasi)
    """
    print(f"Mengunggah ke Facebook dari URL: {image_urls[0]}")
    post_url = f"https://graph.facebook.com/v20.0/{FB_PAGE_ID}/photos"
    payload = {'url': image_urls[0], 'caption': caption, 'access_token': ACCESS_TOKEN}
    r = requests.post(post_url, data=payload)
    if r.status_code == 200:
        print("Berhasil dipublikasikan ke Facebook!")
        return True
    else:
        print(f"Error saat mempublikasikan ke Facebook: {r.json()}")
        return False

# --- FUNGSI UTAMA ---
def main():
    # 0. Periksa file yang diperlukan
    check_required_files()
    
    # 1. Dapatkan Ide Konten
    content_data, rotated_keywords = get_content_idea()
    
    if not content_data:
        print("Error: Tidak bisa mendapatkan konten, menghentikan script")
        return

    print(f"Konten yang dihasilkan:")
    print(f"- Judul: {content_data['judul_gambar']}")
    print(f"- CTA Swipe: {content_data['cta_swipe']}")
    print(f"- Jumlah slide konten: {len(content_data['konten_slides'])}")

    # 2. Simpan kembali keyword yang sudah dirotasi
    try:
        keywords_path = os.path.join(SCRIPT_DIR, 'ig-keywords.json')
        with open(keywords_path, 'w', encoding='utf-8') as f:
            json.dump(rotated_keywords, f, indent=2, ensure_ascii=False)
        print("Keyword telah dirotasi dan urutan baru telah disimpan.")
    except Exception as e:
        print(f"Error saat menyimpan keyword yang dirotasi: {e}")

    # 3. Buat Semua Gambar Carousel
    image_paths, image_urls = create_carousel_images(content_data)
    
    if not image_urls:
        print("Error: Tidak ada gambar yang berhasil dibuat")
        return
    
    print(f"Berhasil membuat {len(image_urls)} gambar untuk carousel")

    # 3. Publikasikan ke Media Sosial
    print("\n--- Memulai Proses Publikasi ---")
    caption = content_data['caption_sosmed']
    
    # Publikasi ke Instagram sebagai carousel
    post_carousel_to_instagram(image_urls, caption)
    
    # Publikasi ke Facebook (gambar pertama saja)
    # post_to_facebook(image_urls, caption)

    print("\n--- Skrip Selesai Dijalankan ---")

if __name__ == "__main__":
    main()