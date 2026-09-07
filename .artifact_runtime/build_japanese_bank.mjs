import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outDir = "/Users/rabihutomo/code/codeverta/outputs";
const outFile = `${outDir}/japanese_learning_bank_5000.xlsx`;
await fs.mkdir(outDir, { recursive: true });

const levels = ["N5", "N4", "N3"];
const sections = ["JFT", "JLPT", "NAT"];
const skillByType = {
  Vocabulary: "Kosakata",
  Grammar: "Tata bahasa",
  Kanji: "Kanji",
  Reading: "Membaca",
  Listening: "Menyimak",
};
const topics = [
  "Perkenalan",
  "Keluarga",
  "Waktu & jadwal",
  "Belanja",
  "Transportasi",
  "Makanan",
  "Sekolah & kerja",
  "Kesehatan",
  "Rumah",
  "Kota & arah",
  "Hobi",
  "Cuaca",
];

const vocab = [
  ["学生", "がくせい", "murid/mahasiswa", "先生", "がくせい", "学生"],
  ["会社", "かいしゃ", "perusahaan", "学校", "かいしゃ", "会社"],
  ["駅", "えき", "stasiun", "店", "えき", "駅"],
  ["病院", "びょういん", "rumah sakit", "銀行", "びょういん", "病院"],
  ["電車", "でんしゃ", "kereta listrik", "自転車", "でんしゃ", "電車"],
  ["水", "みず", "air", "火", "みず", "水"],
  ["今日", "きょう", "hari ini", "昨日", "きょう", "今日"],
  ["明日", "あした", "besok", "毎日", "あした", "明日"],
  ["友達", "ともだち", "teman", "家族", "ともだち", "友達"],
  ["仕事", "しごと", "pekerjaan", "休み", "しごと", "仕事"],
  ["天気", "てんき", "cuaca", "時間", "てんき", "天気"],
  ["映画", "えいが", "film", "音楽", "えいが", "映画"],
  ["大切", "たいせつ", "penting", "簡単", "たいせつ", "大切"],
  ["便利", "べんり", "praktis", "元気", "べんり", "便利"],
  ["必要", "ひつよう", "perlu", "自由", "ひつよう", "必要"],
  ["約束", "やくそく", "janji", "予定", "やくそく", "約束"],
  ["経験", "けいけん", "pengalaman", "練習", "けいけん", "経験"],
  ["説明", "せつめい", "penjelasan", "質問", "せつめい", "説明"],
  ["注意", "ちゅうい", "perhatian/peringatan", "安全", "ちゅうい", "注意"],
  ["準備", "じゅんび", "persiapan", "掃除", "じゅんび", "準備"],
];
const grammar = [
  [
    "です",
    "adalah/sopan",
    "わたしは学生___。",
    "です",
    "でした",
    "ます",
    "ません",
  ],
  [
    "ます",
    "bentuk sopan",
    "毎朝、六時に起き___。",
    "ます",
    "ました",
    "ません",
    "たいです",
  ],
  [
    "ません",
    "tidak (sopan)",
    "肉は食べ___。",
    "ません",
    "ました",
    "ます",
    "たいです",
  ],
  [
    "たいです",
    "ingin melakukan",
    "日本へ行き___。",
    "たいです",
    "ました",
    "ません",
    "ませんか",
  ],
  [
    "から",
    "karena/mulai dari",
    "雨です___、出かけません。",
    "から",
    "まで",
    "だけ",
    "しか",
  ],
  ["まで", "sampai", "九時___働きます。", "まで", "から", "より", "ほど"],
  [
    "より",
    "daripada",
    "電車はバス___速いです。",
    "より",
    "まで",
    "しか",
    "ので",
  ],
  [
    "ので",
    "karena (halus)",
    "用事がある___、帰ります。",
    "ので",
    "のに",
    "のを",
    "でも",
  ],
  [
    "ながら",
    "sambil",
    "音楽を聞き___勉強します。",
    "ながら",
    "なら",
    "たら",
    "ので",
  ],
  [
    "たら",
    "jika/ketika setelah",
    "駅に着い___電話してください。",
    "たら",
    "ながら",
    "なら",
    "だけ",
  ],
  [
    "なら",
    "kalau mengenai",
    "京都へ行く___、秋がいいです。",
    "なら",
    "たら",
    "ので",
    "しか",
  ],
  [
    "のに",
    "padahal/meskipun",
    "勉強した___、忘れました。",
    "のに",
    "ので",
    "から",
    "まで",
  ],
  [
    "ように",
    "agar/seperti",
    "忘れない___メモします。",
    "ように",
    "そうに",
    "みたいに",
    "ためで",
  ],
  [
    "ために",
    "demi/untuk",
    "試験に合格する___勉強します。",
    "ために",
    "ように",
    "ながら",
    "しか",
  ],
  [
    "そうです",
    "kelihatannya",
    "この料理はおいし___。",
    "そうです",
    "ようです",
    "らしいです",
    "ためです",
  ],
];
const kanji = [
  ["山", "やま", "gunung", "川", "山"],
  ["川", "かわ", "sungai", "山", "川"],
  ["人", "ひと", "orang", "入", "人"],
  ["入", "はい", "masuk", "人", "入"],
  ["出", "で", "keluar", "山", "出"],
  ["上", "うえ", "atas", "下", "上"],
  ["下", "した", "bawah", "上", "下"],
  ["中", "なか", "dalam/tengah", "外", "中"],
  ["外", "そと", "luar", "中", "外"],
  ["東", "ひがし", "timur", "西", "東"],
  ["西", "にし", "barat", "東", "西"],
  ["南", "みなみ", "selatan", "北", "南"],
  ["北", "きた", "utara", "南", "北"],
  ["白", "しろ", "putih", "黒", "白"],
  ["黒", "くろ", "hitam", "白", "黒"],
  ["新", "あたら", "baru", "古", "新"],
  ["古", "ふる", "lama/tua", "新", "古"],
  ["高", "たか", "tinggi/mahal", "安", "高"],
  ["安", "やす", "murah/tenang", "高", "安"],
  ["長", "なが", "panjang", "短", "長"],
];
const passages = [
  [
    "田中さんは毎朝七時に起きて、朝ごはんを食べます。それから電車で会社へ行きます。",
    "田中さんは何で会社へ行きますか。",
    "電車で行きます。",
    ["バスで行きます。", "歩いて行きます。", "自転車で行きます。"],
  ],
  [
    "きのうは雨でした。山田さんは家で映画を見ました。今日はいい天気なので、買い物に行きます。",
    "山田さんはきのう何をしましたか。",
    "映画を見ました。",
    ["買い物をしました。", "山へ行きました。", "仕事をしました。"],
  ],
  [
    "駅の前に新しいレストランがあります。昼は安くて、料理もおいしいので、いつも人が多いです。",
    "レストランはどうですか。",
    "安くておいしいです。",
    ["古くて高いです。", "駅から遠いです。", "料理がありません。"],
  ],
  [
    "来週の土曜日、友達と京都へ行く予定です。朝八時に駅で会って、新幹線に乗ります。",
    "二人は何時に会いますか。",
    "八時です。",
    ["七時です。", "九時です。", "十時です。"],
  ],
  [
    "健康のために、毎日三十分歩くようにしています。また、野菜をたくさん食べて、夜は早く寝ます。",
    "何のために歩きますか。",
    "健康のためです。",
    ["仕事のためです。", "旅行のためです。", "試験のためです。"],
  ],
];

function esc(s) {
  return String(s).replaceAll('"', '""');
}
function csv(rows) {
  return rows
    .map((r) => r.map((v) => `"${esc(v ?? "")}"`).join(","))
    .join("\n");
}

const lessonRows = [
  [
    "lesson_id",
    "level",
    "section",
    "lesson_order",
    "title_id",
    "title_ja",
    "title_idn",
    "objective",
    "grammar_points",
    "vocabulary_focus",
    "estimated_minutes",
    "status",
  ],
];
let lessonNo = 1;
for (const level of levels)
  for (let i = 0; i < 12; i++) {
    const section = sections[i % 3];
    const topic = topics[(i + levels.indexOf(level) * 2) % topics.length];
    lessonRows.push([
      `L${String(lessonNo).padStart(3, "0")}`,
      level,
      section,
      i + 1,
      `Pelajaran ${i + 1}: ${topic}`,
      `${topic}の基礎`,
      `Dasar ${topic}`,
      `Siswa mampu memahami dan memakai pola bahasa Jepang untuk topik ${topic.toLowerCase()}.`,
      grammar[(i + levels.indexOf(level)) % grammar.length][0],
      vocab[(i + levels.indexOf(level)) % vocab.length][0],
      25 + (i % 4) * 5,
      "draft",
    ]);
    lessonNo++;
  }

const qRows = [
  [
    "question_id",
    "lesson_id",
    "section",
    "level",
    "skill",
    "question_type",
    "topic",
    "prompt_ja",
    "prompt_idn",
    "choice_a",
    "choice_b",
    "choice_c",
    "choice_d",
    "correct_choice",
    "answer_text",
    "answer_idn",
    "explanation_idn",
    "difficulty",
    "source_tag",
    "review_status",
  ],
];
const answerRows = [
  ["question_id", "correct_choice", "answer_text", "answer_idn"],
];
const choiceRows = [["question_id", "choice_key", "choice_text", "is_correct"]];
const counts = {};
let qNo = 1;
for (let li = 0; li < 9; li++) {
  const level = levels[Math.floor(li / 3)];
  const section = sections[li % 3];
  const count = li < 5 ? 556 : 555;
  const lessonStart = levels.indexOf(level) * 12 + 1;
  for (let j = 0; j < count; j++) {
    const idx = j + li * 17;
    const typeIndex = idx % 5;
    const lessonId = `L${String(lessonStart + (j % 12)).padStart(3, "0")}`;
    const topic = topics[idx % topics.length];
    const qid = `Q${String(qNo).padStart(5, "0")}`;
    let skill,
      qtype,
      promptJa,
      promptIdn,
      choices,
      correct,
      answerText,
      answerIdn,
      explanation;
    if (typeIndex === 0) {
      const v = vocab[idx % vocab.length];
      skill = skillByType.Vocabulary;
      qtype = "multiple_choice";
      promptJa = `「${v[0]}」の意味は何ですか。`;
      promptIdn = `Apa arti 「${v[0]}」?`;
      choices = [v[2], "sekolah", "waktu", "makanan"];
      correct = "A";
      answerText = v[0];
      answerIdn = v[2];
      explanation = `「${v[0]}」は「${v[2]}」という意味です。`;
    } else if (typeIndex === 1) {
      const g = grammar[idx % grammar.length];
      skill = skillByType.Grammar;
      qtype = "multiple_choice";
      promptJa = g[2];
      promptIdn = `Pilih partikel/bentuk yang tepat untuk melengkapi kalimat: ${g[2]}`;
      choices = [g[3], g[4], g[5], g[6]];
      correct = "A";
      answerText = g[3];
      answerIdn = g[1];
      explanation = `Jawaban 「${g[3]}」 tepat karena bermakna ${g[1]}.`;
    } else if (typeIndex === 2) {
      const k = kanji[idx % kanji.length];
      skill = skillByType.Kanji;
      qtype = "kanji_reading";
      promptJa = `「${k[0]}」の読み方はどれですか。`;
      promptIdn = `Bagaimana cara membaca kanji 「${k[0]}」?`;
      choices = [
        k[2] + ` (${k[1]})`,
        "baru (あたら)",
        "murah (やす)",
        "tinggi (たか)",
      ];
      correct = "A";
      answerText = k[1];
      answerIdn = k[2];
      explanation = `Kanji 「${k[0]}」 dibaca 「${k[1]}」 dan berarti ${k[2]}.`;
    } else if (typeIndex === 3) {
      const p = passages[idx % passages.length];
      skill = skillByType.Reading;
      qtype = "reading_comprehension";
      promptJa = `${p[0]}\n\n${p[1]}`;
      promptIdn = `Baca teks lalu jawab: ${p[1]}`;
      choices = [p[2], ...p[3]];
      correct = "A";
      answerText = p[2];
      answerIdn = p[2];
      explanation = `Informasi ini disebutkan langsung di dalam teks.`;
    } else {
      const p = passages[(idx + 2) % passages.length];
      skill = skillByType.Listening;
      qtype = "listening_script";
      promptJa = `音声スクリプト：${p[0]}\n質問：${p[1]}`;
      promptIdn = `Dengarkan/baca skrip audio lalu jawab: ${p[1]}`;
      choices = [p[2], ...p[3]];
      correct = "A";
      answerText = p[2];
      answerIdn = p[2];
      explanation = `Jawaban dapat ditemukan dari informasi utama pada skrip.`;
    }
    qRows.push([
      qid,
      lessonId,
      section,
      level,
      skill,
      qtype,
      topic,
      promptJa,
      promptIdn,
      choices[0],
      choices[1],
      choices[2],
      choices[3],
      correct,
      answerText,
      answerIdn,
      explanation,
      level === "N5"
        ? "basic"
        : level === "N4"
        ? "intermediate"
        : "upper_intermediate",
      `${section}_${level}_generated`,
      "needs_native_review",
    ]);
    answerRows.push([qid, correct, answerText, answerIdn]);
    ["A", "B", "C", "D"].forEach((key, n) =>
      choiceRows.push([qid, key, choices[n], key === correct])
    );
    counts[`${section}-${level}`] = (counts[`${section}-${level}`] || 0) + 1;
    qNo++;
  }
}

const taxonomyRows = [
  ["field", "value", "definition"],
  [
    "section",
    "JFT",
    "Japan Foundation Test; fokus komunikasi praktis dan kehidupan sehari-hari.",
  ],
  [
    "section",
    "JLPT",
    "Japanese-Language Proficiency Test; fokus kosakata, tata bahasa, kanji, membaca, dan menyimak.",
  ],
  [
    "section",
    "NAT",
    "NAT-TEST; struktur latihan bergaya ujian kemampuan bahasa Jepang.",
  ],
  [
    "level",
    "N5",
    "Pemula: fondasi hiragana/katakana, kosakata sehari-hari, dan pola kalimat dasar.",
  ],
  [
    "level",
    "N4",
    "Dasar-menengah: pola kalimat umum, percakapan, dan bacaan pendek.",
  ],
  [
    "level",
    "N3",
    "Menengah awal: bacaan lebih panjang, nuansa tata bahasa, dan konteks kerja/sosial.",
  ],
  [
    "review_status",
    "needs_native_review",
    "Konten siap diimpor sebagai draft; sebaiknya ditinjau native speaker sebelum publikasi final.",
  ],
];

const readmeRows = [
  ["key", "value"],
  ["dataset_name", "Japanese Language Learning Bank — 5,000 Questions"],
  ["language", "Prompt Jepang + metadata/terjemahan Bahasa Indonesia"],
  ["coverage", "3 level: N5, N4, N3; 3 section: JFT, JLPT, NAT"],
  ["question_count", 5000],
  ["lesson_count", 36],
  [
    "import_hint",
    "Gunakan Questions sebagai tabel utama. Choices dapat dinormalisasi menjadi tabel child dengan question_id. AnswerKey menyimpan kunci terpisah untuk backend/penilaian.",
  ],
  ["question_id_format", "Q00001–Q05000"],
  ["lesson_id_format", "L001–L036"],
  ["content_status", "Draft terstruktur / needs_native_review"],
  ["recommended_tables", "lessons, questions, choices, answer_key, taxonomy"],
];

const wb = Workbook.create();
const overview = wb.worksheets.add("Overview");
const lessons = wb.worksheets.add("Lessons");
const questions = wb.worksheets.add("Questions");
const choices = wb.worksheets.add("Choices");
const answerKey = wb.worksheets.add("AnswerKey");
const taxonomy = wb.worksheets.add("Taxonomy");
const readme = wb.worksheets.add("README");

overview.getRange("A1:H1").merge();
overview.getRange("A1").values = [["Japanese Learning Bank — 5,000 Questions"]];
overview.getRange("A3:B8").values = [
  ["Metric", "Value"],
  ["Questions", 5000],
  ["Lessons", 36],
  ["Levels", "N5, N4, N3"],
  ["Sections", "JFT, JLPT, NAT"],
  ["Status", "Draft / needs_native_review"],
];
overview.getRange("D3:F3").values = [["Section", "Level", "Questions"]];
const distRows = Object.entries(counts).map(([key, value]) => {
  const [section, level] = key.split("-");
  return [section, level, value];
});
overview.getRange(`D4:F${3 + distRows.length}`).values = distRows;
overview.getRange("A10:F10").values = [
  ["Import order", "Sheet", "Use", "Key", "Rows", "Notes"],
];
overview.getRange("A11:F16").values = [
  [1, "Lessons", "lesson metadata", "lesson_id", 36, "Parent table"],
  [2, "Questions", "main question bank", "question_id", 5000, "Main import"],
  [
    3,
    "Choices",
    "normalized options",
    "question_id + choice_key",
    20000,
    "4 choices/question",
  ],
  [4, "AnswerKey", "answer lookup", "question_id", 5000, "Scoring service"],
  [
    5,
    "Taxonomy",
    "enum definitions",
    "field + value",
    8,
    "Validation/reference",
  ],
  [6, "README", "implementation notes", "key", 11, "Documentation"],
];

function writeTable(sheet, rows, widths = []) {
  sheet.getRangeByIndexes(0, 0, rows.length, rows[0].length).values = rows;
  const header = sheet.getRangeByIndexes(0, 0, 1, rows[0].length);
  header.format = {
    fill: "#1F4E78",
    font: { bold: true, color: "#FFFFFF" },
    wrapText: true,
    verticalAlignment: "center",
  };
  header.format.rowHeight = 30;
  sheet.freezePanes.freezeRows(1);
  sheet.showGridLines = false;
  sheet.getUsedRange().format.borders = {
    preset: "all",
    style: "thin",
    color: "#D9E2F3",
  };
  sheet.getUsedRange().format.verticalAlignment = "top";
  sheet.getUsedRange().format.wrapText = true;
  if (widths.length)
    widths.forEach(
      (w, i) =>
        (sheet.getRangeByIndexes(0, i, rows.length, 1).format.columnWidth = w)
    );
  else sheet.getUsedRange().format.autofitColumns();
}

writeTable(
  lessons,
  lessonRows,
  [12, 10, 10, 12, 24, 20, 22, 52, 18, 20, 18, 16]
);
writeTable(
  questions,
  qRows,
  [
    12, 12, 10, 8, 16, 20, 18, 44, 44, 24, 24, 24, 24, 16, 24, 28, 42, 18, 24,
    20,
  ]
);
writeTable(choices, choiceRows, [12, 12, 48, 12]);
writeTable(answerKey, answerRows, [12, 16, 30, 40]);
writeTable(taxonomy, taxonomyRows, [18, 22, 80]);
writeTable(readme, readmeRows, [24, 100]);

overview.getRange("A1:H1").format = {
  fill: "#1F4E78",
  font: { bold: true, color: "#FFFFFF", size: 16 },
  horizontalAlignment: "center",
  verticalAlignment: "center",
};
overview.getRange("A1:H1").format.rowHeight = 32;
overview.getRange("A3:B3").format = {
  fill: "#5B9BD5",
  font: { bold: true, color: "#FFFFFF" },
};
overview.getRange("D3:F3").format = {
  fill: "#5B9BD5",
  font: { bold: true, color: "#FFFFFF" },
};
overview.getRange("A10:F10").format = {
  fill: "#5B9BD5",
  font: { bold: true, color: "#FFFFFF" },
};
overview.getRange("A3:F16").format.borders = {
  preset: "all",
  style: "thin",
  color: "#D9E2F3",
};
overview.getRange("A3:F16").format.wrapText = true;
overview.getRange("A:A").format.columnWidth = 16;
overview.getRange("B:B").format.columnWidth = 24;
overview.getRange("C:C").format.columnWidth = 8;
overview.getRange("D:D").format.columnWidth = 14;
overview.getRange("E:E").format.columnWidth = 14;
overview.getRange("F:F").format.columnWidth = 22;
overview.freezePanes.freezeRows(3);
overview.showGridLines = false;

await wb.recalculate();
const inspect = await wb.inspect({
  kind: "sheet,table",
  maxChars: 5000,
  tableMaxRows: 4,
  tableMaxCols: 6,
});
console.log(inspect.ndjson ?? inspect);
const xlsx = await SpreadsheetFile.exportXlsx(wb);
await xlsx.save(outFile);
console.log(`SAVED ${outFile}`);
console.log(
  `QUESTIONS ${qRows.length - 1} LESSONS ${lessonRows.length - 1} CHOICES ${
    choiceRows.length - 1
  }`
);
