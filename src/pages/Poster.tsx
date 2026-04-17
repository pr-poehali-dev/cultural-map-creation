import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const PEOPLES_IMG = "https://cdn.poehali.dev/projects/1b1581b6-ac92-4b5f-adce-b651ee5e6b7e/files/f95dac0a-cdfd-43a7-9657-e149e6b1705b.jpg";
const SYMBOLS_IMG = "https://cdn.poehali.dev/projects/1b1581b6-ac92-4b5f-adce-b651ee5e6b7e/files/266e85be-1493-4abd-84c0-53f73141767d.jpg";

const PEOPLES = [
  { name: "Русские", region: "Центральная Россия" },
  { name: "Татары", region: "Поволжье" },
  { name: "Башкиры", region: "Урал" },
  { name: "Чеченцы", region: "Кавказ" },
  { name: "Аварцы", region: "Дагестан" },
  { name: "Мордва", region: "Поволжье" },
  { name: "Якуты", region: "Сибирь" },
  { name: "Буряты", region: "Байкал" },
  { name: "Осетины", region: "Кавказ" },
  { name: "Тувинцы", region: "Сибирь" },
  { name: "Коми", region: "Север" },
  { name: "Ненцы", region: "Арктика" },
];

// Герб — двуглавый орёл SVG
function Eagle({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Тело */}
      <ellipse cx="50" cy="58" rx="16" ry="20" fill="#c8a040" />
      {/* Левое крыло */}
      <path d="M34 54 C18 44 8 30 14 20 C20 12 32 22 36 36 C38 42 36 50 34 54Z" fill="#c8a040" />
      <path d="M34 54 C20 48 10 38 16 28 C20 22 30 30 34 42Z" fill="#b08030" opacity="0.5" />
      {/* Правое крыло */}
      <path d="M66 54 C82 44 92 30 86 20 C80 12 68 22 64 36 C62 42 64 50 66 54Z" fill="#c8a040" />
      <path d="M66 54 C80 48 90 38 84 28 C80 22 70 30 66 42Z" fill="#b08030" opacity="0.5" />
      {/* Голова левая */}
      <circle cx="38" cy="30" r="10" fill="#c8a040" />
      <circle cx="35" cy="27" r="3" fill="#1a1a2e" />
      <circle cx="35.8" cy="26.2" r="1" fill="#fff" opacity="0.6" />
      <path d="M31 33 L28 36 L33 35Z" fill="#d4782a" />
      {/* Корона левая */}
      <path d="M32 21 L34 17 L36 20 L38 16 L40 20 L42 17 L44 21" stroke="#c8a040" strokeWidth="1.5" fill="none" />
      {/* Голова правая */}
      <circle cx="62" cy="30" r="10" fill="#c8a040" />
      <circle cx="65" cy="27" r="3" fill="#1a1a2e" />
      <circle cx="64.2" cy="26.2" r="1" fill="#fff" opacity="0.6" />
      <path d="M69 33 L72 36 L67 35Z" fill="#d4782a" />
      {/* Корона правая */}
      <path d="M56 21 L58 17 L60 20 L62 16 L64 20 L66 17 L68 21" stroke="#c8a040" strokeWidth="1.5" fill="none" />
      {/* Большая корона */}
      <path d="M44 18 L47 12 L50 10 L53 12 L56 18" stroke="#c8a040" strokeWidth="2" fill="none" />
      <circle cx="50" cy="10" r="3" fill="#c8a040" />
      {/* Скипетр и держава */}
      <line x1="44" y1="62" x2="40" y2="76" stroke="#c8a040" strokeWidth="2" />
      <circle cx="40" cy="77" r="3" fill="#c8a040" />
      <line x1="56" y1="62" x2="60" y2="76" stroke="#c8a040" strokeWidth="2" />
      <circle cx="62" cy="74" r="4" fill="#c8a040" />
      <circle cx="62" cy="74" r="2.5" fill="none" stroke="#b08030" strokeWidth="0.8" />
      {/* Щит на груди */}
      <path d="M44 54 L44 68 Q50 74 56 68 L56 54Z" fill="#cc0000" />
      <path d="M47 57 Q50 60 53 57 L53 66 Q50 70 47 66Z" fill="#cc0000" />
      {/* Всадник на щите */}
      <circle cx="50" cy="58" r="2" fill="#c8a040" />
      <path d="M50 60 L50 65" stroke="#c8a040" strokeWidth="1.2" />
      <path d="M50 62 L47 64 L48 65" stroke="#c8a040" strokeWidth="0.8" fill="none" />
    </svg>
  );
}

// Флаг России
function RussianFlag({ width = 120, height = 80 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 120 80" rx="2">
      <rect x="0" y="0" width="120" height="26.6" fill="#FFFFFF" />
      <rect x="0" y="26.6" width="120" height="26.6" fill="#0039A6" />
      <rect x="0" y="53.2" width="120" height="26.8" fill="#D52B1E" />
      <rect x="0" y="0" width="120" height="80" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
    </svg>
  );
}

export default function Poster() {
  return (
    <div
      className="min-h-screen flex flex-col items-center"
      style={{
        background: "#06070d",
        fontFamily: "'Cormorant', serif",
        padding: "1.5rem 1rem 4rem",
      }}
    >
      {/* nav */}
      <div className="w-full max-w-3xl flex justify-between items-center mb-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm opacity-40 hover:opacity-80 transition-opacity"
          style={{ color: "#c8a96e", fontFamily: "'IBM Plex Sans', sans-serif" }}
        >
          <Icon name="ArrowLeft" size={15} />
          Назад
        </Link>
        <span
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#e8dfc8",
            opacity: 0.25,
          }}
        >
          Плакат · Единство народов России
        </span>
      </div>

      {/* ===== ПЛАКАТ ===== */}
      <div
        id="poster"
        style={{
          width: "680px",
          background: "linear-gradient(180deg, #0a0b14 0%, #0d1020 35%, #0a0b14 100%)",
          border: "2px solid rgba(200,169,110,0.4)",
          boxShadow: "0 0 120px rgba(200,169,110,0.1), inset 0 0 60px rgba(200,169,110,0.03)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Фоновая текстура — флаговые полосы едва видимые */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          background: "repeating-linear-gradient(180deg, #fff 0px, #fff 80px, #0039A6 80px, #0039A6 160px, #D52B1E 160px, #D52B1E 240px)",
          zIndex: 0,
        }} />

        {/* Верхняя полоса — цвета флага */}
        <div style={{ display: "flex", height: "6px", position: "relative", zIndex: 1 }}>
          <div style={{ flex: 1, background: "#FFFFFF" }} />
          <div style={{ flex: 1, background: "#0039A6" }} />
          <div style={{ flex: 1, background: "#D52B1E" }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, padding: "36px 52px 48px" }}>

          {/* Шапка — герб + заголовок + флаг */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
            <Eagle size={90} />
            <div style={{ textAlign: "center", flex: 1, padding: "0 20px" }}>
              <p style={{
                fontSize: "0.6rem",
                letterSpacing: "0.45em",
                textTransform: "uppercase",
                color: "#c8a96e",
                fontFamily: "'IBM Plex Sans', sans-serif",
                marginBottom: "10px",
                opacity: 0.8,
              }}>
                Российская Федерация
              </p>
              <h1 style={{
                fontSize: "2.6rem",
                fontWeight: 300,
                lineHeight: 1.05,
                color: "#f2ead8",
                letterSpacing: "0.01em",
                textShadow: "0 0 40px rgba(200,169,110,0.3)",
              }}>
                Единство<br />
                <span style={{ color: "#c8a96e", fontStyle: "italic", fontSize: "3rem" }}>
                  народов России
                </span>
              </h1>
              <div style={{
                height: "1px",
                background: "linear-gradient(90deg, transparent, #D52B1E 20%, #c8a96e 50%, #0039A6 80%, transparent)",
                margin: "14px auto",
                width: "260px",
                opacity: 0.6,
              }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
              <RussianFlag width={100} height={67} />
              <span style={{
                fontSize: "0.55rem",
                letterSpacing: "0.2em",
                color: "#c8a96e",
                opacity: 0.5,
                fontFamily: "'IBM Plex Sans', sans-serif",
                textTransform: "uppercase",
              }}>
                193 народа
              </span>
            </div>
          </div>

          {/* Главное фото — народы вместе */}
          <div style={{
            position: "relative",
            marginBottom: "28px",
            borderRadius: "2px",
            overflow: "hidden",
            border: "1px solid rgba(200,169,110,0.25)",
          }}>
            <img
              src={PEOPLES_IMG}
              alt="Народы России вместе"
              style={{ width: "100%", height: "280px", objectFit: "cover", objectPosition: "center top", display: "block" }}
            />
            {/* Градиентный оверлей */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(180deg, rgba(10,11,20,0) 40%, rgba(10,11,20,0.95) 100%)",
            }} />
            {/* Надпись поверх фото */}
            <div style={{
              position: "absolute", bottom: "20px", left: "28px", right: "28px",
            }}>
              <p style={{
                fontFamily: "'Cormorant', serif",
                fontSize: "1.4rem",
                fontWeight: 300,
                fontStyle: "italic",
                color: "#f2ead8",
                textShadow: "0 2px 20px rgba(0,0,0,0.8)",
                lineHeight: 1.4,
              }}>
                «Мы — многонациональный народ Российской Федерации,
                соединённые общей судьбой на своей земле»
              </p>
              <p style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                color: "#c8a96e",
                opacity: 0.7,
                marginTop: "6px",
              }}>
                — Преамбула Конституции Российской Федерации
              </p>
            </div>
          </div>

          {/* Символика + народы */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
            {/* Символика */}
            <div style={{
              position: "relative",
              borderRadius: "2px",
              overflow: "hidden",
              border: "1px solid rgba(200,169,110,0.2)",
              height: "180px",
            }}>
              <img
                src={SYMBOLS_IMG}
                alt="Символика России"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, rgba(10,11,20,0.6) 0%, rgba(10,11,20,0.1) 100%)",
              }} />
              <div style={{ position: "absolute", top: "16px", left: "16px" }}>
                <p style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: "0.55rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#c8a96e",
                  marginBottom: "4px",
                }}>
                  Символы России
                </p>
                <p style={{
                  fontFamily: "'Cormorant', serif",
                  fontSize: "1.3rem",
                  fontWeight: 300,
                  color: "#f2ead8",
                  lineHeight: 1.2,
                }}>
                  Флаг. Герб.<br />Гимн. Конституция.
                </p>
              </div>
            </div>

            {/* Народы плашки */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <p style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: "0.55rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#c8a96e",
                marginBottom: "4px",
                opacity: 0.7,
              }}>
                Народы России
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px", flex: 1 }}>
                {PEOPLES.map((p, i) => {
                  const colors = ["#D52B1E", "#0039A6", "#c8a96e", "#2e7d32", "#6a1b9a"];
                  const color = colors[i % colors.length];
                  return (
                    <div
                      key={i}
                      style={{
                        background: `${color}10`,
                        border: `1px solid ${color}35`,
                        borderLeft: `2px solid ${color}80`,
                        padding: "4px 8px",
                        borderRadius: "1px",
                      }}
                    >
                      <div style={{
                        fontFamily: "'IBM Plex Sans', sans-serif",
                        fontSize: "0.65rem",
                        color: "#e8dfc8",
                        fontWeight: 500,
                      }}>
                        {p.name}
                      </div>
                      <div style={{
                        fontFamily: "'IBM Plex Sans', sans-serif",
                        fontSize: "0.5rem",
                        color: color,
                        opacity: 0.7,
                      }}>
                        {p.region}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Три принципа */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "12px",
            marginBottom: "28px",
          }}>
            {[
              { flag: "🤝", color: "#D52B1E", title: "Дружба народов", text: "Братство и взаимоуважение — основа великой России" },
              { flag: "🦅", color: "#c8a96e", title: "Общая история", text: "Столетия побед, испытаний и триумфов — вместе" },
              { flag: "🌟", color: "#0039A6", title: "Сильная страна", text: "В единстве — наша сила и непобедимость" },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: `${item.color}08`,
                  border: `1px solid ${item.color}30`,
                  borderTop: `3px solid ${item.color}`,
                  padding: "16px 14px",
                  textAlign: "center",
                  borderRadius: "1px",
                }}
              >
                <div style={{ fontSize: "1.8rem", marginBottom: "8px" }}>{item.flag}</div>
                <div style={{
                  fontFamily: "'Cormorant', serif",
                  fontSize: "0.95rem",
                  color: item.color,
                  marginBottom: "6px",
                  fontWeight: 500,
                }}>
                  {item.title}
                </div>
                <div style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: "0.62rem",
                  color: "#e8dfc8",
                  opacity: 0.55,
                  lineHeight: 1.5,
                }}>
                  {item.text}
                </div>
              </div>
            ))}
          </div>

          {/* Девиз */}
          <div style={{
            textAlign: "center",
            padding: "22px 40px",
            background: "rgba(200,169,110,0.05)",
            border: "1px solid rgba(200,169,110,0.2)",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Декоративные звёзды */}
            {["8%", "92%"].map((left, i) => (
              <div key={i} style={{
                position: "absolute",
                top: "50%",
                left,
                transform: "translate(-50%, -50%)",
                fontSize: "1.2rem",
                opacity: 0.3,
              }}>★</div>
            ))}
            <p style={{
              fontFamily: "'Cormorant', serif",
              fontSize: "1.6rem",
              fontWeight: 300,
              letterSpacing: "0.08em",
              color: "#f2ead8",
              marginBottom: "6px",
              textTransform: "uppercase",
            }}>
              Россия — единая и неделимая
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", alignItems: "center" }}>
              <div style={{ height: "1px", width: "60px", background: "#D52B1E", opacity: 0.6 }} />
              <span style={{ fontSize: "1rem", opacity: 0.5 }}>★</span>
              <div style={{ height: "1px", width: "60px", background: "#0039A6", opacity: 0.6 }} />
            </div>
          </div>

        </div>

        {/* Нижняя полоса — цвета флага */}
        <div style={{ display: "flex", height: "6px", position: "relative", zIndex: 1 }}>
          <div style={{ flex: 1, background: "#D52B1E" }} />
          <div style={{ flex: 1, background: "#0039A6" }} />
          <div style={{ flex: 1, background: "#FFFFFF" }} />
        </div>
      </div>

      <p style={{
        marginTop: "20px",
        fontFamily: "'IBM Plex Sans', sans-serif",
        fontSize: "0.7rem",
        color: "#e8dfc8",
        opacity: 0.25,
        textAlign: "center",
      }}>
        Для скриншота: F12 → Ctrl+Shift+M → ширина 680px → Print Screen
      </p>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
