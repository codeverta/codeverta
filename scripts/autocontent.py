import os
import shutil # BARU: Untuk memindahkan file
import uuid   # BARU: Untuk membuat nama file unik
from google import genai
from PIL import Image, ImageDraw, ImageFont
import requests
import json
import textwrap
from dotenv import load_dotenv

# --- KONFIGURASI ---
load_dotenv()

GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY') or os.getenv('GEMINI_API_KEY')
FB_PAGE_ID = os.getenv('FB_PAGE_ID')
IG_USER_ID = os.getenv('IG_USER_ID')
ACCESS_TOKEN = os.getenv('ACCESS_TOKEN')
WEBSITE_BASE_URL = os.getenv('WEBSITE_BASE_URL') # BARU
API_VERSION = "v23.0" 

if not all([GOOGLE_API_KEY, FB_PAGE_ID, IG_USER_ID, ACCESS_TOKEN, WEBSITE_BASE_URL]):
    print("Error: Pastikan semua environment variables (termasuk WEBSITE_BASE_URL) sudah diatur.")
    exit()

# --- Pengaturan Path ---
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR) # Naik satu level ke root proyek
PUBLIC_DIR = os.path.join(PROJECT_ROOT, 'public', 'generated-content')

# Pastikan direktori tujuan ada
os.makedirs(PUBLIC_DIR, exist_ok=True)

FONT_PATH = os.path.join(SCRIPT_DIR, 'Poppins-Bold.ttf')
TEMPLATE_IMAGE_PATH = os.path.join(SCRIPT_DIR, 'template.png')
FONT_SIZE = 80
TEXT_COLOR = (20, 33, 61)

# --- FUNGSI-FUNGSI (get_content_idea, generate_image, dll) ---
# ... (Semua fungsi ini sama seperti sebelumnya, tidak perlu diubah) ...
def get_content_idea():
    """
    Membaca keywords dari file JSON, lalu meminta ide konten dari Gemini berdasarkan keywords tersebut.
    """
    try:
        # Path ke file keywords.json (diasumsikan berada di direktori yang sama dengan skrip)
        keywords_path = os.path.join(SCRIPT_DIR, 'keywords.json')

        print(f"Membaca keywords dari: {keywords_path}")
        with open(keywords_path, 'r', encoding='utf-8') as f:
            all_keywords = json.load(f)

        # Ambil 3 keyword pertama dari array
        if len(all_keywords) < 3:
            print("Peringatan: File keywords.json memiliki kurang dari 3 item. Menggunakan semua item yang ada.")
            selected_keywords = all_keywords
        else:
            selected_keywords = all_keywords[:3]

        # Gabungkan keywords menjadi sebuah string untuk dimasukkan ke dalam prompt
        keywords_for_prompt = ", ".join(f'"{k}"' for k in selected_keywords)
        print(f"Menggunakan keywords: {keywords_for_prompt} sebagai inspirasi topik.")

    except FileNotFoundError:
        print(f"Error: File 'keywords.json' tidak ditemukan. Menggunakan topik default.")
        # Fallback jika file tidak ada
        keywords_for_prompt = '"alasan kenapa bisnis perlu website", "tips seputar website", "kesalahan umum website bisnis"'
    except (json.JSONDecodeError, IndexError) as e:
        print(f"Error saat memproses 'keywords.json': {e}. Menggunakan topik default.")
        # Fallback jika file rusak atau isinya tidak sesuai
        keywords_for_prompt = '"alasan kenapa bisnis perlu website", "tips seputar website", "kesalahan umum website bisnis"'

    print("Meminta ide konten dari Gemini 2.0 Flash...")
    try:
        client = genai.Client()
        prompt = """
        Anda adalah seorang ahli strategi media sosial untuk agensi "Jasa Bikin Aplikasi dan Website Jogja".
        Buat satu ide konten menarik untuk Instagram dan Facebook.
        Topiknya harus seputar berikut {keywords_for_prompt}.

        Berikan jawaban dalam format JSON yang strict dengan struktur berikut:
        {
          "judul_gambar": "Teks singkat dan menarik untuk ditampilkan di gambar. Maksimal 10 kata.",
          "caption_sosmed": "Caption lengkap maksimal 2000 karaketer untuk postingan media sosial. Sertakan hook, isi, call-to-action untuk mengunjungi codeverta.com, dan beberapa hashtag relevan seperti #jasabikinwebsite #websitejogja #digitalmarketing #umkmjogja."
        }
        """        
        response = client.models.generate_content(model='gemini-2.0-flash', contents=prompt)
        return json.loads(response.text.replace("```json", "").replace("```", "").strip())
    except Exception as e:
        print(f"Error saat mengambil ide dari Gemini: {e}")
        return None

def generate_image(text_to_draw, template_path, output_path):
    print(f"Membuat gambar di: {output_path}")
    try:
        img = Image.open(template_path).convert("RGB")
        draw = ImageDraw.Draw(img)
        font = ImageFont.truetype(FONT_PATH, FONT_SIZE)
        avg_char_width = sum(font.getlength(c) for c in 'abcdefghijklmnopqrstuvwxyz') / 26
        max_chars_per_line = int((img.width * 0.8) / avg_char_width) if avg_char_width > 0 else 20
        wrapped_text = textwrap.fill(text_to_draw, width=max_chars_per_line)
        text_bbox = draw.textbbox((0, 0), wrapped_text, font=font, align='center')
        text_width, text_height = text_bbox[2] - text_bbox[0], text_bbox[3] - text_bbox[1]
        x, y = (img.width - text_width) / 2, (img.height - text_height) / 2 - 50
        draw.text((x, y), wrapped_text, font=font, fill=TEXT_COLOR, align='center')
        img.save(output_path)
        return True
    except Exception as e:
        print(f"Error saat membuat gambar: {e}")
        return False


def post_to_instagram(image_url, caption):
    """
    Mengunggah ke Instagram menggunakan alur dua langkah, dengan token di header.
    """
    print(f"Mengunggah ke Instagram dari URL: {image_url}")
    
    # Header yang diperlukan untuk otorisasi
    headers = {
        'Authorization': f'Bearer {ACCESS_TOKEN}',
        'Content-Type': 'application/json'
    }

    # LANGKAH 1: Buat Kontainer Media
    create_container_url = f"https://graph.facebook.com/{API_VERSION}/{IG_USER_ID}/media"
    container_payload = {
        'image_url': image_url,
        'caption': caption
    }
    
    print("Membuat kontainer media di Instagram...")
    r = requests.post(create_container_url, headers=headers, json=container_payload)
    
    if r.status_code != 200:
        print(f"Error saat membuat container Instagram: {r.json()}")
        return False
    
    creation_id = r.json()['id']
    print(f"Kontainer media berhasil dibuat. ID: {creation_id}")

    # Tunggu beberapa saat agar Instagram memproses kontainer (opsional tapi disarankan)
    print("Menunggu 5 detik untuk memastikan kontainer siap...")
    time.sleep(5)
    
    # LANGKAH 2: Publikasikan Kontainer
    publish_url = f"https://graph.facebook.com/{API_VERSION}/{IG_USER_ID}/media_publish"
    publish_payload = {
        'creation_id': creation_id
    }
    
    print("Mempublikasikan konten...")
    r = requests.post(publish_url, headers=headers, json=publish_payload)
    
    if r.status_code == 200:
        print("Berhasil dipublikasikan ke Instagram!")
        return True
    else:
        print(f"Error saat mempublikasikan ke Instagram: {r.json()}")
        return False

def post_to_facebook(image_url, caption):
    print(f"Mengunggah ke Facebook dari URL: {image_url}")
    post_url = f"https://graph.facebook.com/v20.0/{FB_PAGE_ID}/photos"
    payload = {'url': image_url, 'caption': caption, 'access_token': ACCESS_TOKEN}
    r = requests.post(post_url, data=payload)
    if r.status_code == 200:
        print("Berhasil dipublikasikan ke Facebook!")
        return True
    else:
        print(f"Error saat mempublikasikan ke Facebook: {r.json()}")
        return False


# --- FUNGSI UTAMA (DIUBAH SECARA SIGNIFIKAN) ---
def main():
    # 1. Dapatkan Ide Konten
    # content_data = get_content_idea()
    # if not content_data:
    #     return

    # # 2. Buat Gambar dengan Nama Unik
    # # Menggunakan nama unik agar tidak menimpa file lama
    # image_filename = f"content-{uuid.uuid4()}.png"
    # local_image_path = os.path.join(SCRIPT_DIR, image_filename)
    
    # success_generating = generate_image(
    #     text_to_draw=content_data['judul_gambar'],
    #     template_path=TEMPLATE_IMAGE_PATH,
    #     output_path=local_image_path
    # )
    # if not success_generating:
    #     return

    # # 3. Pindahkan Gambar ke Folder Public
    # public_image_path = os.path.join(PUBLIC_DIR, image_filename)
    # shutil.move(local_image_path, public_image_path)
    # print(f"Gambar dipindahkan ke: {public_image_path}")

    # # 4. Buat URL Publik
    # public_image_url = f"{WEBSITE_BASE_URL.rstrip('/')}/generated-content/{image_filename}"

    # # 5. Publikasikan ke Media Sosial
    # print("\n--- Memulai Proses Publikasi ---")
    # caption = content_data['caption_sosmed']
    
    public_image_url = "https://fastly.picsum.photos/id/885/400/600.jpg?hmac=sq_DeGCvUMiyWEoPniCfXrsDPzdUZ0xbRMXBvJ2IxUw"
    caption = "Postingan ini diupload secara otomatis oleh skrip Python. #automated #python"
    
    post_to_instagram(public_image_url, caption)
    # post_to_facebook(public_image_url, caption)

    print("\n--- Skrip Selesai Dijalankan ---")

if __name__ == "__main__":
    main()