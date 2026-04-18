import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const PEOPLES_IMG_URL = "https://cdn.poehali.dev/projects/1b1581b6-ac92-4b5f-adce-b651ee5e6b7e/files/f95dac0a-cdfd-43a7-9657-e149e6b1705b.jpg";
const SYMBOLS_IMG_URL = "https://cdn.poehali.dev/projects/1b1581b6-ac92-4b5f-adce-b651ee5e6b7e/files/266e85be-1493-4abd-84c0-53f73141767d.jpg";

async function toBase64(url: string): Promise<string> {
  const res = await fetch(url);
  const blob = await res.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}

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

function Eagle({ size = 80 }: { size?: number }) {
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
      <circle cx="62" cy="74" r="2.5" fill="none" stroke="#9a7000" strokeWidth="0.8" />
      <path d="M44 54 L44 68 Q50 74 56 68 L56 54Z" fill="#cc0000" />
      <circle cx="50" cy="58" r="2" fill="#b8860b" />
      <path d="M50 60 L50 65" stroke="#b8860b" strokeWidth="1.2" />
      <path d="M50 62 L47 64 L48 65" stroke="#b8860b" strokeWidth="0.8" fill="none" />
    </svg>
  );
}

function RussianFlag({ width = 120, height = 80 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 120 80">
      <rect x="0" y="0" width="120" height="26.6" fill="#FFFFFF" />
      <rect x="0" y="26.6" width="120" height="26.6" fill="#0039A6" />
      <rect x="0" y="53.2" width="120" height="26.8" fill="#D52B1E" />
      <rect x="0" y="0" width="120" height="80" fill="none" stroke="#c8c8c8" strokeWidth="1" />
    </svg>
  );
}

export default function Poster() {
  const posterRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [peoplesImg, setPeoplesImg] = useState(PEOPLES_IMG_URL);
  const [symbolsImg, setSymbolsImg] = useState(SYMBOLS_IMG_URL);

  useEffect(() => {
    toBase64(PEOPLES_IMG_URL).then(setPeoplesImg).catch(() => {});
    toBase64(SYMBOLS_IMG_URL).then(setSymbolsImg).catch(() => {});
  }, []);

  const handleDownload = async () => {
    if (!posterRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(posterRef.current, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#fdfaf4",
        logging: false,
        imageTimeout: 15000,
      });
      const imgData = canvas.toDataURL("image/png");
      const w = canvas.width / 3;
      const h = canvas.height / 3;
      const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [w, h] });
      pdf.addImage(imgData, "PNG", 0, 0, w, h);
      pdf.save("plakat-edinstvo-narodov.pdf");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center"
      style={{
        background: "#f0ece4",
        fontFamily: "'Cormorant', serif",
        padding: "1.5rem 1rem 4rem",
      }}
    >
      {/* nav */}
      <div className="w-full max-w-3xl flex justify-between items-center mb-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
          style={{ color: "#5a4a2a", fontFamily: "'IBM Plex Sans', sans-serif", opacity: 0.6 }}
        >
          <Icon name="ArrowLeft" size={15} />
          Назад
        </Link>
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex items-center gap-2 transition-all hover:opacity-80 active:scale-95"
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "0.08em",
            color: "#fff",
            background: downloading ? "#9a7000" : "#b8860b",
            border: "none",
            borderRadius: "4px",
            padding: "8px 18px",
            cursor: downloading ? "wait" : "pointer",
            fontWeight: 500,
          }}
        >
          <Icon name={downloading ? "Loader2" : "Download"} size={14} />
          {downloading ? "Сохраняю..." : "Скачать плакат"}
        </button>
      </div>

      {/* ===== ПЛАКАТ ===== */}
      <div
        ref={posterRef}
        id="poster"
        style={{
          width: "680px",
          background: "linear-gradient(180deg, #fdfaf4 0%, #faf6ec 50%, #fdfaf4 100%)",
          border: "2px solid #d4b87a",
          boxShadow: "0 8px 60px rgba(100,70,10,0.15), 0 2px 8px rgba(100,70,10,0.08)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Тонкий паттерн фона */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.03,
          backgroundImage: "radial-gradient(circle, #8b6914 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          zIndex: 0,
        }} />

        {/* Верхняя полоса — флаг */}
        <div style={{ display: "flex", height: "7px", position: "relative", zIndex: 1 }}>
          <div style={{ flex: 1, background: "#FFFFFF", borderBottom: "1px solid #e0ddd8" }} />
          <div style={{ flex: 1, background: "#0039A6" }} />
          <div style={{ flex: 1, background: "#D52B1E" }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, padding: "36px 52px 44px" }}>

          {/* Шапка */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "26px" }}>
            <Eagle size={90} />
            <div style={{ textAlign: "center", flex: 1, padding: "0 20px" }}>
              <p style={{
                fontSize: "0.58rem",
                letterSpacing: "0.5em",
                textTransform: "uppercase",
                color: "#9a7000",
                fontFamily: "'IBM Plex Sans', sans-serif",
                marginBottom: "10px",
              }}>
                Российская Федерация
              </p>
              <h1 style={{
                fontSize: "2.5rem",
                fontWeight: 300,
                lineHeight: 1.05,
                color: "#1a1206",
                letterSpacing: "0.01em",
              }}>
                Единство<br />
                <span style={{ color: "#b8860b", fontStyle: "italic", fontSize: "2.9rem" }}>
                  народов России
                </span>
              </h1>
              <div style={{
                height: "1.5px",
                background: "linear-gradient(90deg, transparent, #D52B1E 20%, #b8860b 50%, #0039A6 80%, transparent)",
                margin: "14px auto",
                width: "260px",
              }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
              <RussianFlag width={100} height={67} />
              <span style={{
                fontSize: "0.55rem",
                letterSpacing: "0.2em",
                color: "#9a7000",
                fontFamily: "'IBM Plex Sans', sans-serif",
                textTransform: "uppercase",
              }}>
                193 народа
              </span>
            </div>
          </div>

          {/* Главное фото */}
          <div style={{
            position: "relative",
            marginBottom: "24px",
            borderRadius: "2px",
            overflow: "hidden",
            border: "1px solid #d4b87a",
            boxShadow: "0 2px 12px rgba(100,70,10,0.1)",
          }}>
            <img
              src={peoplesImg}
              alt="Народы России вместе"
              style={{ width: "100%", height: "270px", objectFit: "cover", objectPosition: "center top", display: "block" }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(180deg, rgba(253,250,244,0) 45%, rgba(253,250,244,0.97) 100%)",
            }} />
            <div style={{ position: "absolute", bottom: "18px", left: "28px", right: "28px" }}>
              <p style={{
                fontFamily: "'Cormorant', serif",
                fontSize: "1.35rem",
                fontWeight: 400,
                fontStyle: "italic",
                color: "#1a1206",
                lineHeight: 1.4,
              }}>
                «Мы — многонациональный народ Российской Федерации,
                соединённые общей судьбой на своей земле»
              </p>
              <p style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                color: "#9a7000",
                marginTop: "6px",
              }}>
                — Преамбула Конституции Российской Федерации
              </p>
            </div>
          </div>

          {/* Символика + народы */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "22px" }}>
            <div style={{
              position: "relative",
              borderRadius: "2px",
              overflow: "hidden",
              border: "1px solid #d4b87a",
              height: "180px",
              boxShadow: "0 2px 8px rgba(100,70,10,0.08)",
            }}>
              <img
                src={symbolsImg}
                alt="Символика России"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, rgba(253,250,244,0.88) 0%, rgba(253,250,244,0.2) 60%)",
              }} />
              
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <p style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: "0.52rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#9a7000",
                marginBottom: "4px",
              }}>
                Народы России
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px" }}>
                {PEOPLES.map((p, i) => {
                  const colors = ["#D52B1E", "#0039A6", "#9a7000", "#2e7d32", "#6a1b9a"];
                  const color = colors[i % colors.length];
                  return (
                    <div
                      key={i}
                      style={{
                        background: `${color}0d`,
                        border: `1px solid ${color}30`,
                        borderLeft: `2px solid ${color}80`,
                        padding: "4px 8px",
                        borderRadius: "1px",
                      }}
                    >
                      <div style={{
                        fontFamily: "'IBM Plex Sans', sans-serif",
                        fontSize: "0.65rem",
                        color: "#1a1206",
                        fontWeight: 500,
                      }}>
                        {p.name}
                      </div>
                      <div style={{
                        fontFamily: "'IBM Plex Sans', sans-serif",
                        fontSize: "0.5rem",
                        color: color,
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "26px" }}>
            {[
              { icon: "🤝", color: "#D52B1E", title: "Дружба народов", text: "Братство и взаимоуважение — основа великой России" },
              { icon: "📜", color: "#b8860b", title: "Общая история", text: "Столетия побед, испытаний и триумфов — вместе" },
              { icon: "🌟", color: "#0039A6", title: "Сильная страна", text: "В единстве — наша сила и непобедимость" },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: `${item.color}08`,
                  border: `1px solid ${item.color}25`,
                  borderTop: `3px solid ${item.color}`,
                  padding: "16px 14px",
                  textAlign: "center",
                  borderRadius: "1px",
                }}
              >
                <div style={{ fontSize: "1.8rem", marginBottom: "8px" }}>{item.icon}</div>
                <div style={{
                  fontFamily: "'Cormorant', serif",
                  fontSize: "0.95rem",
                  color: item.color,
                  marginBottom: "6px",
                  fontWeight: 600,
                }}>
                  {item.title}
                </div>
                <div style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: "0.62rem",
                  color: "#3a2e18",
                  opacity: 0.75,
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
            padding: "20px 40px",
            background: "linear-gradient(135deg, #fff8e8 0%, #fdf4d8 100%)",
            border: "1px solid #d4b87a",
            borderRadius: "2px",
            position: "relative",
          }}>
            {["8%", "92%"].map((left, i) => (
              <div key={i} style={{
                position: "absolute",
                top: "50%",
                left,
                transform: "translate(-50%, -50%)",
                fontSize: "1.4rem",
                color: "#b8860b",
                opacity: 0.35,
              }}>★</div>
            ))}
            <p style={{
              fontFamily: "'Cormorant', serif",
              fontSize: "1.55rem",
              fontWeight: 400,
              letterSpacing: "0.06em",
              color: "#1a1206",
              marginBottom: "8px",
              textTransform: "uppercase",
            }}>
              Россия — единая и неделимая
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "14px", alignItems: "center" }}>
              <div style={{ height: "1.5px", width: "56px", background: "#D52B1E" }} />
              <span style={{ fontSize: "1rem", color: "#b8860b" }}>★</span>
              <div style={{ height: "1.5px", width: "56px", background: "#0039A6" }} />
            </div>
          </div>

        </div>

        {/* Нижняя полоса */}
        <div style={{ display: "flex", height: "7px", position: "relative", zIndex: 1 }}>
          <div style={{ flex: 1, background: "#D52B1E" }} />
          <div style={{ flex: 1, background: "#0039A6" }} />
          <div style={{ flex: 1, background: "#e0ddd8", borderTop: "1px solid #c8c8c8" }} />
        </div>
      </div>
    </div>
  );
}