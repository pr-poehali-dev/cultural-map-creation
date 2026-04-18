import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const MAP_IMG = "https://cdn.poehali.dev/projects/1b1581b6-ac92-4b5f-adce-b651ee5e6b7e/files/cda9c37f-df54-4fa1-8031-f20740575a18.jpg";
const LANG_IMG = "https://cdn.poehali.dev/projects/1b1581b6-ac92-4b5f-adce-b651ee5e6b7e/files/17daed83-538a-40f4-8227-740087426ea0.jpg";
const PEOPLES_IMG = "https://cdn.poehali.dev/projects/1b1581b6-ac92-4b5f-adce-b651ee5e6b7e/files/f95dac0a-cdfd-43a7-9657-e149e6b1705b.jpg";
const SYMBOLS_IMG = "https://cdn.poehali.dev/projects/1b1581b6-ac92-4b5f-adce-b651ee5e6b7e/files/266e85be-1493-4abd-84c0-53f73141767d.jpg";

const ETHNICS = [
  { name: "Русские", pct: 80.9, color: "#D52B1E" },
  { name: "Татары", pct: 3.7, color: "#0039A6" },
  { name: "Башкиры", pct: 1.2, color: "#b8860b" },
  { name: "Чеченцы", pct: 1.4, color: "#2e7d32" },
  { name: "Аварцы", pct: 0.9, color: "#6a1b9a" },
  { name: "Другие", pct: 11.9, color: "#9e9e9e" },
];

function Eagle({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="58" rx="16" ry="20" fill="#b8860b" />
      <path d="M34 54 C18 44 8 30 14 20 C20 12 32 22 36 36 C38 42 36 50 34 54Z" fill="#b8860b" />
      <path d="M34 54 C20 48 10 38 16 28 C20 22 30 30 34 42Z" fill="#9a7000" opacity="0.5" />
      <path d="M66 54 C82 44 92 30 86 20 C80 12 68 22 64 36 C62 42 64 50 66 54Z" fill="#b8860b" />
      <path d="M66 54 C80 48 90 38 84 28 C80 22 70 30 66 42Z" fill="#9a7000" opacity="0.5" />
      <circle cx="38" cy="30" r="10" fill="#b8860b" />
      <circle cx="35" cy="27" r="3" fill="#2c1810" />
      <circle cx="35.8" cy="26.2" r="1" fill="#fff" opacity="0.7" />
      <path d="M31 33 L28 36 L33 35Z" fill="#c0392b" />
      <path d="M32 21 L34 17 L36 20 L38 16 L40 20 L42 17 L44 21" stroke="#b8860b" strokeWidth="1.5" fill="none" />
      <circle cx="62" cy="30" r="10" fill="#b8860b" />
      <circle cx="65" cy="27" r="3" fill="#2c1810" />
      <circle cx="64.2" cy="26.2" r="1" fill="#fff" opacity="0.7" />
      <path d="M69 33 L72 36 L67 35Z" fill="#c0392b" />
      <path d="M56 21 L58 17 L60 20 L62 16 L64 20 L66 17 L68 21" stroke="#b8860b" strokeWidth="1.5" fill="none" />
      <path d="M44 18 L47 12 L50 10 L53 12 L56 18" stroke="#b8860b" strokeWidth="2" fill="none" />
      <circle cx="50" cy="10" r="3" fill="#b8860b" />
      <line x1="44" y1="62" x2="40" y2="76" stroke="#b8860b" strokeWidth="2" />
      <circle cx="40" cy="77" r="3" fill="#b8860b" />
      <line x1="56" y1="62" x2="60" y2="76" stroke="#b8860b" strokeWidth="2" />
      <circle cx="62" cy="74" r="4" fill="#b8860b" />
      <path d="M44 54 L44 68 Q50 74 56 68 L56 54Z" fill="#cc0000" />
      <circle cx="50" cy="58" r="2" fill="#b8860b" />
      <path d="M50 60 L50 65" stroke="#b8860b" strokeWidth="1.2" />
    </svg>
  );
}

function Flag({ w = 72, h = 48 }: { w?: number; h?: number }) {
  return (
    <svg width={w} height={h} viewBox="0 0 72 48">
      <rect x="0" y="0" width="72" height="16" fill="#FFFFFF" />
      <rect x="0" y="16" width="72" height="16" fill="#0039A6" />
      <rect x="0" y="32" width="72" height="16" fill="#D52B1E" />
      <rect x="0" y="0" width="72" height="48" fill="none" stroke="#ccc" strokeWidth="0.5" />
    </svg>
  );
}

function PieChart() {
  const cx = 90, cy = 90, r = 75;
  let startAngle = -90;
  const slices = ETHNICS.map((e) => {
    const angle = (e.pct / 100) * 360;
    const start = startAngle;
    startAngle += angle;
    return { ...e, startAngle: start, endAngle: startAngle };
  });

  function arcPath(start: number, end: number) {
    const s = ((start) * Math.PI) / 180;
    const e = ((end) * Math.PI) / 180;
    const x1 = cx + r * Math.cos(s), y1 = cy + r * Math.sin(s);
    const x2 = cx + r * Math.cos(e), y2 = cy + r * Math.sin(e);
    const large = end - start > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
  }

  return (
    <svg width={180} height={180} viewBox="0 0 180 180">
      {slices.map((s, i) => (
        <path key={i} d={arcPath(s.startAngle, s.endAngle)} fill={s.color} stroke="#fff" strokeWidth="1.5" />
      ))}
      <circle cx={cx} cy={cy} r={30} fill="#fdfaf4" />
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize="9" fill="#1a1206" fontFamily="IBM Plex Sans">193</text>
      <text x={cx} y={cy + 8} textAnchor="middle" fontSize="7" fill="#9a7000" fontFamily="IBM Plex Sans">народа</text>
    </svg>
  );
}

const SLIDE_W = 800;
const SLIDE_H = 520;

const S = {
  slide: {
    width: SLIDE_W,
    minHeight: SLIDE_H,
    background: "linear-gradient(160deg, #fdfaf4 0%, #faf4e4 100%)",
    border: "1.5px solid #d4b87a",
    boxShadow: "0 4px 32px rgba(100,70,10,0.12)",
    position: "relative" as const,
    overflow: "hidden",
    fontFamily: "'Cormorant', serif",
    flexShrink: 0,
  },
  flagBar: { display: "flex", height: "5px" },
  inner: { padding: "36px 48px 40px" },
  badge: {
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontSize: "0.52rem",
    letterSpacing: "0.4em",
    textTransform: "uppercase" as const,
    color: "#9a7000",
    marginBottom: "6px",
  },
  h1: { fontSize: "2.8rem", fontWeight: 300, lineHeight: 1.05, color: "#1a1206" },
  h2: { fontSize: "1.6rem", fontWeight: 400, color: "#1a1206", marginBottom: "4px" },
  sub: {
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontSize: "0.72rem",
    color: "#5a4a2a",
    lineHeight: 1.6,
  },
  divider: {
    height: "1.5px",
    background: "linear-gradient(90deg, transparent, #D52B1E 20%, #b8860b 50%, #0039A6 80%, transparent)",
    margin: "12px 0",
  },
  taskNum: {
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontSize: "0.55rem",
    letterSpacing: "0.3em",
    textTransform: "uppercase" as const,
    color: "#fff",
    background: "#b8860b",
    padding: "3px 10px",
    display: "inline-block",
    marginBottom: "10px",
  },
  link: {
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontSize: "0.65rem",
    color: "#0039A6",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    marginTop: "8px",
    borderBottom: "1px solid #0039A6",
    paddingBottom: "1px",
  },
};

function FlagBar({ reverse = false }: { reverse?: boolean }) {
  const colors = reverse
    ? ["#D52B1E", "#0039A6", "#FFFFFF"]
    : ["#FFFFFF", "#0039A6", "#D52B1E"];
  return (
    <div style={S.flagBar}>
      {colors.map((c, i) => (
        <div key={i} style={{ flex: 1, background: c, borderBottom: c === "#FFFFFF" ? "1px solid #e0ddd8" : undefined }} />
      ))}
    </div>
  );
}

function Watermark() {
  return (
    <div style={{
      position: "absolute", inset: 0, opacity: 0.025, zIndex: 0,
      backgroundImage: "radial-gradient(circle, #8b6914 1px, transparent 1px)",
      backgroundSize: "18px 18px",
    }} />
  );
}

function SlideNum({ n, total }: { n: number; total: number }) {
  return (
    <div style={{
      position: "absolute", bottom: "14px", right: "20px",
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: "0.6rem", color: "#b8860b", opacity: 0.5,
    }}>
      {n} / {total}
    </div>
  );
}

// ─── СЛАЙД 1: Титульный ──────────────────────────────────────────────────────
function Slide1() {
  return (
    <div style={S.slide}>
      <Watermark />
      <FlagBar />
      <div style={{ ...S.inner, position: "relative", zIndex: 1, display: "flex", gap: "40px", alignItems: "center", minHeight: SLIDE_H - 10 }}>
        <div style={{ flex: 1 }}>
          <p style={S.badge}>Марафон · Год единства народов России · 2024</p>
          <h1 style={{ ...S.h1, fontSize: "3rem" }}>
            Многонациональная<br />
            <span style={{ color: "#b8860b", fontStyle: "italic" }}>Россия</span>
          </h1>
          <div style={S.divider} />
          <p style={{ ...S.sub, fontSize: "0.78rem", maxWidth: "360px" }}>
            Итоговая презентация марафона культурных традиций народов Российской Федерации.
            Объединяет результаты пяти творческих заданий.
          </p>
          <div style={{ marginTop: "20px", display: "flex", gap: "10px", alignItems: "center" }}>
            <Flag w={72} h={48} />
            <Eagle size={56} />
            <div>
              <div style={{ ...S.badge, marginBottom: "2px" }}>Автор</div>
              <div style={{ fontFamily: "'Cormorant', serif", fontSize: "1.1rem", color: "#1a1206" }}>
                Участник марафона
              </div>
              <div style={{ ...S.sub, fontSize: "0.62rem", opacity: 0.6 }}>2024 год</div>
            </div>
          </div>
        </div>
        <div style={{ width: "280px", flexShrink: 0 }}>
          <img src={PEOPLES_IMG} alt="Народы России"
            style={{ width: "100%", height: "340px", objectFit: "cover", objectPosition: "center top", border: "1.5px solid #d4b87a", display: "block" }} />
          <div style={{ background: "#D52B1E", padding: "8px 14px" }}>
            <p style={{ ...S.sub, color: "#fff", fontSize: "0.65rem", fontStyle: "italic" }}>
              «В единстве — наша сила»
            </p>
          </div>
        </div>
      </div>
      <FlagBar reverse />
      <SlideNum n={1} total={6} />
    </div>
  );
}

// ─── СЛАЙД 2: Карта традиций ─────────────────────────────────────────────────
function Slide2() {
  return (
    <div style={S.slide}>
      <Watermark />
      <FlagBar />
      <div style={{ ...S.inner, position: "relative", zIndex: 1, display: "flex", gap: "32px" }}>
        <div style={{ flex: 1 }}>
          <div style={S.taskNum}>Задание 1</div>
          <h2 style={S.h2}>Интерактивная карта<br />культурных традиций</h2>
          <div style={S.divider} />
          <p style={S.sub}>
            Интерактивная карта охватывает 6 регионов России: Сибирь, Кавказ, Поволжье,
            Русский Север, Урал и Дальний Восток. Каждый регион содержит подробные описания
            традиций, обрядов и праздников коренных народов.
          </p>
          <div style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "6px" }}>
            {["Сибирь — шаманизм, Ысыах", "Кавказ — адат, куначество", "Поволжье — Сабантуй", "Русский Север — былины, зодчество"].map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "6px", height: "6px", background: "#b8860b", borderRadius: "50%", flexShrink: 0 }} />
                <span style={{ ...S.sub, fontSize: "0.68rem" }}>{t}</span>
              </div>
            ))}
          </div>
          <a href="/" style={S.link}>
            🔗 Открыть интерактивную карту
          </a>
        </div>
        <div style={{ width: "310px", flexShrink: 0 }}>
          <img src={MAP_IMG} alt="Карта традиций"
            style={{ width: "100%", height: "320px", objectFit: "cover", border: "1.5px solid #d4b87a", display: "block" }} />
          <div style={{ background: "#faf0d0", border: "1px solid #d4b87a", borderTop: "none", padding: "6px 12px" }}>
            <span style={{ ...S.sub, fontSize: "0.6rem", color: "#9a7000" }}>Скриншот: интерактивная карта регионов России</span>
          </div>
        </div>
      </div>
      <FlagBar reverse />
      <SlideNum n={2} total={6} />
    </div>
  );
}

// ─── СЛАЙД 3: Языки ──────────────────────────────────────────────────────────
function Slide3() {
  const langs = [
    { name: "Русский", speakers: "137 млн", color: "#D52B1E", pct: 92 },
    { name: "Татарский", speakers: "5.3 млн", color: "#0039A6", pct: 36 },
    { name: "Чеченский", speakers: "1.4 млн", color: "#2e7d32", pct: 20 },
    { name: "Башкирский", speakers: "1.1 млн", color: "#b8860b", pct: 17 },
    { name: "Аварский", speakers: "0.9 млн", color: "#6a1b9a", pct: 13 },
    { name: "Якутский", speakers: "0.5 млн", color: "#00838f", pct: 9 },
  ];
  return (
    <div style={S.slide}>
      <Watermark />
      <FlagBar />
      <div style={{ ...S.inner, position: "relative", zIndex: 1, display: "flex", gap: "32px" }}>
        <div style={{ flex: 1 }}>
          <div style={S.taskNum}>Задание 2</div>
          <h2 style={S.h2}>Инфографика<br />«Языки народов России»</h2>
          <div style={S.divider} />
          <p style={{ ...S.sub, marginBottom: "16px" }}>
            В России официально признаны <strong>37 государственных языков</strong> субъектов федерации.
            Всего на территории страны используется более <strong>277 языков и диалектов</strong>.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {langs.map((l, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                  <span style={{ ...S.sub, fontSize: "0.68rem", fontWeight: 500 }}>{l.name}</span>
                  <span style={{ ...S.sub, fontSize: "0.62rem", color: l.color }}>{l.speakers}</span>
                </div>
                <div style={{ height: "6px", background: "#e8e0d0", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${l.pct}%`, background: l.color, borderRadius: "3px" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ width: "300px", flexShrink: 0 }}>
          <img src={LANG_IMG} alt="Языки народов"
            style={{ width: "100%", height: "280px", objectFit: "cover", border: "1.5px solid #d4b87a", display: "block" }} />
          <div style={{ background: "#faf0d0", border: "1px solid #d4b87a", borderTop: "none", padding: "6px 12px" }}>
            <span style={{ ...S.sub, fontSize: "0.6rem", color: "#9a7000" }}>Скриншот: инфографика языков</span>
          </div>
        </div>
      </div>
      <FlagBar reverse />
      <SlideNum n={3} total={6} />
    </div>
  );
}

// ─── СЛАЙД 4: Кроссворд ──────────────────────────────────────────────────────
function Slide4() {
  const words = [
    { word: "САБАНТУЙ", hint: "Татарский праздник плуга", dir: "→" },
    { word: "ЫСЫАХ", hint: "Якутский праздник солнца", dir: "↓" },
    { word: "ЛЕЗГИНКА", hint: "Кавказский танец", dir: "→" },
    { word: "АДАТ", hint: "Горский обычай", dir: "↓" },
    { word: "ШАМАН", hint: "Посредник между мирами", dir: "→" },
  ];
  return (
    <div style={S.slide}>
      <Watermark />
      <FlagBar />
      <div style={{ ...S.inner, position: "relative", zIndex: 1, display: "flex", gap: "32px" }}>
        <div style={{ flex: 1 }}>
          <div style={S.taskNum}>Задание 3</div>
          <h2 style={S.h2}>Кроссворд<br />«Культура народов России»</h2>
          <div style={S.divider} />
          <p style={{ ...S.sub, marginBottom: "14px" }}>
            Тематический кроссворд включает ключевые понятия культур народов России:
            традиции, праздники, обряды и исторические термины.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
            {words.map((w, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", background: "#faf0d0", padding: "6px 10px", border: "1px solid #d4b87a" }}>
                <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.6rem", color: "#9a7000", minWidth: "16px" }}>{w.dir}</span>
                <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.72rem", fontWeight: 700, color: "#D52B1E", minWidth: "90px", letterSpacing: "0.1em" }}>{w.word}</span>
                <span style={{ ...S.sub, fontSize: "0.62rem" }}>{w.hint}</span>
              </div>
            ))}
          </div>
          <a href="/" style={S.link}>
            🔗 Открыть интерактивный кроссворд
          </a>
        </div>
        <div style={{ width: "290px", flexShrink: 0 }}>
          {/* Схема кроссворда */}
          <div style={{ border: "1.5px solid #d4b87a", background: "#fff", padding: "16px", display: "inline-block", width: "100%" }}>
            <p style={{ ...S.badge, marginBottom: "12px" }}>Схема кроссворда</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: "2px" }}>
              {Array.from({ length: 80 }, (_, i) => {
                const filled = [0, 10, 20, 21, 22, 23, 30, 40, 41, 42, 43, 44, 50, 60, 61, 62, 63, 70].includes(i);
                const special = [0, 10, 20, 40, 60].includes(i);
                return (
                  <div key={i} style={{
                    width: "100%",
                    aspectRatio: "1",
                    background: filled ? (special ? "#D52B1E" : "#1a1206") : "#f5f0e8",
                    border: "0.5px solid #d4b87a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    {special && <span style={{ color: "#fff", fontSize: "6px", fontFamily: "'IBM Plex Sans', sans-serif" }}>{["С", "Ы", "Л", "А", "Ш"][Math.floor(i / 10)]}</span>}
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: "10px", display: "flex", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <div style={{ width: "10px", height: "10px", background: "#D52B1E" }} />
                <span style={{ fontSize: "0.55rem", fontFamily: "'IBM Plex Sans', sans-serif", color: "#5a4a2a" }}>По горизонтали</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <div style={{ width: "10px", height: "10px", background: "#1a1206" }} />
                <span style={{ fontSize: "0.55rem", fontFamily: "'IBM Plex Sans', sans-serif", color: "#5a4a2a" }}>По вертикали</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FlagBar reverse />
      <SlideNum n={4} total={6} />
    </div>
  );
}

// ─── СЛАЙД 5: Диаграмма ──────────────────────────────────────────────────────
function Slide5() {
  return (
    <div style={S.slide}>
      <Watermark />
      <FlagBar />
      <div style={{ ...S.inner, position: "relative", zIndex: 1, display: "flex", gap: "32px", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <div style={S.taskNum}>Задание 4</div>
          <h2 style={S.h2}>Диаграмма<br />«Этнокультурный состав России»</h2>
          <div style={S.divider} />
          <p style={{ ...S.sub, marginBottom: "16px" }}>
            По данным Всероссийской переписи населения 2021 года.
            Россия — одна из самых многонациональных стран мира.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {ETHNICS.map((e, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "28px", height: "28px", background: e.color, borderRadius: "2px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#fff", fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.6rem", fontWeight: 700 }}>{e.pct}%</span>
                </div>
                <div>
                  <div style={{ ...S.sub, fontWeight: 500, fontSize: "0.72rem", color: "#1a1206" }}>{e.name}</div>
                  <div style={{ height: "4px", width: `${Math.max(e.pct * 2.2, 20)}px`, background: e.color, marginTop: "3px", borderRadius: "2px" }} />
                </div>
              </div>
            ))}
          </div>
          <p style={{ ...S.sub, fontSize: "0.6rem", marginTop: "12px", opacity: 0.6 }}>
            * Данные: Росстат, перепись 2021 г. Всего зафиксировано 193 народа.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", paddingTop: "20px" }}>
          <PieChart />
          <div style={{ textAlign: "center" }}>
            <div style={{ ...S.badge, marginBottom: "4px" }}>Народы России</div>
            <div style={{ fontFamily: "'Cormorant', serif", fontSize: "1.8rem", color: "#b8860b" }}>193</div>
            <div style={{ ...S.sub, fontSize: "0.62rem" }}>официально признанных</div>
          </div>
        </div>
      </div>
      <FlagBar reverse />
      <SlideNum n={5} total={6} />
    </div>
  );
}

// ─── СЛАЙД 6: Плакат ─────────────────────────────────────────────────────────
function Slide6() {
  return (
    <div style={S.slide}>
      <Watermark />
      <FlagBar />
      <div style={{ ...S.inner, position: "relative", zIndex: 1, display: "flex", gap: "32px", alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <div style={S.taskNum}>Задание 5</div>
          <h2 style={S.h2}>Плакат<br />«Единство народов России»</h2>
          <div style={S.divider} />
          <p style={S.sub}>
            Финальный плакат марафона объединяет ключевые образы:
            государственную символику, портреты представителей народов России,
            цитату из Конституции и карточки 12 народов страны.
          </p>
          <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              { icon: "🏛️", text: "Герб и флаг Российской Федерации" },
              { icon: "📜", text: "Цитата из Конституции РФ" },
              { icon: "🤝", text: "12 народов России с регионами" },
              { icon: "🌟", text: "Принципы единства и дружбы" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                <span style={{ ...S.sub, fontSize: "0.68rem" }}>{item.text}</span>
              </div>
            ))}
          </div>
          <a href="/poster" style={S.link}>
            🔗 Открыть плакат
          </a>
        </div>
        <div style={{ width: "310px", flexShrink: 0 }}>
          <img src={PEOPLES_IMG} alt="Плакат — народы России"
            style={{ width: "100%", height: "260px", objectFit: "cover", objectPosition: "center top", border: "1.5px solid #d4b87a", display: "block" }} />
          <img src={SYMBOLS_IMG} alt="Символика России"
            style={{ width: "100%", height: "80px", objectFit: "cover", border: "1.5px solid #d4b87a", borderTop: "none", display: "block" }} />
          <div style={{ background: "#faf0d0", border: "1px solid #d4b87a", borderTop: "none", padding: "6px 12px" }}>
            <span style={{ ...S.sub, fontSize: "0.6rem", color: "#9a7000" }}>Скриншот: плакат «Единство народов России»</span>
          </div>
        </div>
      </div>
      <FlagBar reverse />
      <SlideNum n={6} total={6} />
    </div>
  );
}

const SLIDES = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6];
const SLIDE_TITLES = ["Титульный", "Карта традиций", "Языки народов", "Кроссворд", "Диаграмма", "Плакат"];

export default function Presentation() {
  const [current, setCurrent] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const slidesRef = useRef<HTMLDivElement>(null);

  const SlideComp = SLIDES[current];

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [SLIDE_W, SLIDE_H + 10] });

      for (let i = 0; i < SLIDES.length; i++) {
        const el = document.getElementById(`slide-render-${i}`);
        if (!el) continue;
        const canvas = await html2canvas(el, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#fdfaf4",
          logging: false,
        });
        const imgData = canvas.toDataURL("image/png");
        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, 0, SLIDE_W, SLIDE_H);
      }
      pdf.save("prezentaciya-maraton-edinstvo.pdf");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f0ece4", fontFamily: "'Cormorant', serif", padding: "1.5rem 1rem 4rem" }}>
      {/* nav */}
      <div style={{ maxWidth: SLIDE_W, margin: "0 auto 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "6px", color: "#5a4a2a", fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.8rem", opacity: 0.6, textDecoration: "none" }}>
          <Icon name="ArrowLeft" size={14} /> Назад
        </Link>
        <button
          onClick={handleDownload}
          disabled={downloading}
          style={{
            display: "flex", alignItems: "center", gap: "6px",
            fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.75rem",
            color: "#fff", background: downloading ? "#9a7000" : "#b8860b",
            border: "none", borderRadius: "4px", padding: "8px 18px",
            cursor: downloading ? "wait" : "pointer", fontWeight: 500,
          }}
        >
          <Icon name={downloading ? "Loader2" : "Download"} size={14} />
          {downloading ? "Собираю PDF..." : "Скачать презентацию (PDF)"}
        </button>
      </div>

      {/* Активный слайд */}
      <div style={{ maxWidth: SLIDE_W, margin: "0 auto 20px" }}>
        <SlideComp />
      </div>

      {/* Навигация */}
      <div style={{ maxWidth: SLIDE_W, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
        <button
          onClick={() => setCurrent(c => Math.max(0, c - 1))}
          disabled={current === 0}
          style={{
            background: "none", border: "1.5px solid #d4b87a", borderRadius: "4px",
            padding: "6px 14px", cursor: current === 0 ? "not-allowed" : "pointer",
            opacity: current === 0 ? 0.3 : 1, color: "#5a4a2a",
            fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.75rem",
            display: "flex", alignItems: "center", gap: "4px",
          }}
        >
          <Icon name="ChevronLeft" size={14} /> Назад
        </button>
        <div style={{ display: "flex", gap: "6px" }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              title={SLIDE_TITLES[i]}
              style={{
                width: i === current ? "28px" : "10px",
                height: "10px",
                borderRadius: "5px",
                background: i === current ? "#b8860b" : "#d4b87a",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s",
                padding: 0,
              }}
            />
          ))}
        </div>
        <button
          onClick={() => setCurrent(c => Math.min(SLIDES.length - 1, c + 1))}
          disabled={current === SLIDES.length - 1}
          style={{
            background: "none", border: "1.5px solid #d4b87a", borderRadius: "4px",
            padding: "6px 14px", cursor: current === SLIDES.length - 1 ? "not-allowed" : "pointer",
            opacity: current === SLIDES.length - 1 ? 0.3 : 1, color: "#5a4a2a",
            fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.75rem",
            display: "flex", alignItems: "center", gap: "4px",
          }}
        >
          Вперёд <Icon name="ChevronRight" size={14} />
        </button>
      </div>
      <div style={{ maxWidth: SLIDE_W, margin: "8px auto 0", textAlign: "center", fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.65rem", color: "#9a7000" }}>
        Слайд {current + 1} из {SLIDES.length} — {SLIDE_TITLES[current]}
      </div>

      {/* Скрытые слайды для рендера PDF */}
      <div ref={slidesRef} style={{ position: "absolute", left: "-9999px", top: 0, pointerEvents: "none" }}>
        {SLIDES.map((SlideC, i) => (
          <div key={i} id={`slide-render-${i}`} style={{ width: SLIDE_W }}>
            <SlideC />
          </div>
        ))}
      </div>
    </div>
  );
}
