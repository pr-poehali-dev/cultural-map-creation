import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const PEOPLES = [
  "Русские", "Татары", "Башкиры", "Чуваши", "Чеченцы",
  "Аварцы", "Мордва", "Армяне", "Украинцы", "Якуты",
  "Буряты", "Кабардинцы", "Осетины", "Даргинцы", "Кумыки",
  "Ингуши", "Лезгины", "Тувинцы", "Коми", "Марийцы",
  "Удмурты", "Карачаевцы", "Калмыки", "Ненцы", "Эвенки",
];

const RINGS = [
  { r: 138, count: 8, offset: 0 },
  { r: 100, count: 6, offset: 18 },
  { r: 64, count: 4, offset: 30 },
];

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

const ORNAMENT_DOTS = Array.from({ length: 36 }, (_, i) => {
  const { x, y } = polarToXY(300, 300, 270, i * 10);
  return { x, y, i };
});

export default function Poster() {
  const cx = 300, cy = 300;

  return (
    <div
      className="min-h-screen flex flex-col items-center"
      style={{
        background: "#0e0e14",
        fontFamily: "'Cormorant', serif",
        padding: "2rem 1rem 4rem",
      }}
    >
      {/* nav */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm opacity-50 hover:opacity-100 transition-opacity"
          style={{ color: "#c8a96e", fontFamily: "'IBM Plex Sans', sans-serif" }}
        >
          <Icon name="ArrowLeft" size={15} />
          Назад
        </Link>
        <span
          className="text-xs tracking-widest uppercase opacity-30"
          style={{ fontFamily: "'IBM Plex Sans', sans-serif", letterSpacing: "0.25em", color: "#e8dfc8" }}
        >
          Плакат · Единство народов России
        </span>
      </div>

      {/* POSTER */}
      <div
        id="poster"
        style={{
          width: "600px",
          background: "linear-gradient(170deg, #0a0c12 0%, #111420 50%, #0c0e18 100%)",
          border: "1px solid rgba(200,169,110,0.25)",
          boxShadow: "0 0 80px rgba(200,169,110,0.08), 0 0 0 1px rgba(255,255,255,0.04)",
          position: "relative",
          overflow: "hidden",
          padding: "0",
        }}
      >
        {/* Угловые орнаменты */}
        {[
          { top: 16, left: 16, rotate: 0 },
          { top: 16, right: 16, rotate: 90 },
          { bottom: 16, right: 16, rotate: 180 },
          { bottom: 16, left: 16, rotate: 270 },
        ].map((pos, i) => (
          <svg
            key={i}
            width="40"
            height="40"
            viewBox="0 0 40 40"
            style={{ position: "absolute", ...pos, transform: `rotate(${pos.rotate}deg)`, opacity: 0.5 }}
          >
            <path d="M2 2 L18 2 M2 2 L2 18" stroke="#c8a96e" strokeWidth="1.5" fill="none" />
            <circle cx="2" cy="2" r="2" fill="#c8a96e" />
          </svg>
        ))}

        {/* Горизонтальные декоративные полосы */}
        <div style={{ height: "3px", background: "linear-gradient(90deg, transparent, #c8a96e 30%, #e8d08a 50%, #c8a96e 70%, transparent)", opacity: 0.7 }} />

        <div style={{ padding: "40px 48px 48px" }}>
          {/* Надпись сверху */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <p
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "#c8a96e",
                opacity: 0.8,
                fontFamily: "'IBM Plex Sans', sans-serif",
                marginBottom: "12px",
              }}
            >
              Российская Федерация
            </p>
            <h1
              style={{
                fontSize: "2.8rem",
                fontWeight: 300,
                lineHeight: 1.05,
                color: "#f0e8d0",
                letterSpacing: "0.02em",
                marginBottom: "8px",
              }}
            >
              Единство
              <br />
              <span style={{ color: "#c8a96e", fontStyle: "italic" }}>народов России</span>
            </h1>
            <div
              style={{
                height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(200,169,110,0.5), transparent)",
                margin: "16px auto",
                width: "200px",
              }}
            />
          </div>

          {/* SVG — круговая схема народов */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "32px" }}>
            <svg width="600" height="600" viewBox="0 0 600 600">
              {/* Фон-свечение */}
              <defs>
                <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#c8a96e" stopOpacity="0.12" />
                  <stop offset="60%" stopColor="#c8a96e" stopOpacity="0.04" />
                  <stop offset="100%" stopColor="#c8a96e" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#e8d08a" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#c8a96e" stopOpacity="0" />
                </radialGradient>
                <filter id="blur">
                  <feGaussianBlur stdDeviation="8" />
                </filter>
              </defs>

              <circle cx={cx} cy={cy} r="270" fill="url(#glow)" />

              {/* Кольца орнамента */}
              {[270, 250, 155, 40].map((r, i) => (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="none"
                  stroke="#c8a96e"
                  strokeWidth={i === 0 ? 0.5 : 0.3}
                  strokeOpacity={i === 0 ? 0.15 : 0.1}
                  strokeDasharray={i === 1 ? "2 8" : undefined}
                />
              ))}

              {/* Точки по внешней окружности */}
              {ORNAMENT_DOTS.map(({ x, y, i }) => (
                <circle key={i} cx={x} cy={y} r="1.5" fill="#c8a96e" opacity="0.3" />
              ))}

              {/* Линии-лучи от центра */}
              {Array.from({ length: 25 }, (_, i) => {
                const angle = (i * 360) / 25;
                const inner = polarToXY(cx, cy, 48, angle);
                const outer = polarToXY(cx, cy, 248, angle);
                return (
                  <line
                    key={i}
                    x1={inner.x}
                    y1={inner.y}
                    x2={outer.x}
                    y2={outer.y}
                    stroke="#c8a96e"
                    strokeWidth="0.4"
                    strokeOpacity="0.12"
                  />
                );
              })}

              {/* Народы — кружки по спирали */}
              {PEOPLES.map((name, i) => {
                const angle = (i * 360) / PEOPLES.length;
                // Чередуем радиус: три кольца
                const ringR = i % 3 === 0 ? 200 : i % 3 === 1 ? 160 : 125;
                const { x, y } = polarToXY(cx, cy, ringR, angle);
                const dotR = 14;
                return (
                  <g key={i}>
                    {/* Линия к центру */}
                    <line
                      x1={cx} y1={cy} x2={x} y2={y}
                      stroke="#c8a96e" strokeWidth="0.6" strokeOpacity="0.2"
                    />
                    {/* Кружок */}
                    <circle cx={x} cy={y} r={dotR + 2} fill="rgba(200,169,110,0.06)" />
                    <circle
                      cx={x} cy={y} r={dotR}
                      fill="rgba(10,12,20,0.9)"
                      stroke="#c8a96e"
                      strokeWidth="0.8"
                      strokeOpacity="0.5"
                    />
                    {/* Имя */}
                    <text
                      x={x} y={y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#e8dfc8"
                      fontSize="5.5"
                      fontFamily="'IBM Plex Sans', sans-serif"
                      opacity="0.9"
                    >
                      {name}
                    </text>
                  </g>
                );
              })}

              {/* Центр — символ */}
              <circle cx={cx} cy={cy} r="44" fill="url(#centerGlow)" />
              <circle cx={cx} cy={cy} r="40" fill="rgba(10,12,20,0.95)" stroke="#c8a96e" strokeWidth="1" strokeOpacity="0.6" />
              <circle cx={cx} cy={cy} r="33" fill="none" stroke="#c8a96e" strokeWidth="0.4" strokeOpacity="0.3" />

              {/* Звезда в центре */}
              {Array.from({ length: 8 }, (_, i) => {
                const a1 = (i * 45);
                const a2 = (i * 45 + 22.5);
                const p1 = polarToXY(cx, cy, 22, a1);
                const p2 = polarToXY(cx, cy, 10, a2);
                const p3 = polarToXY(cx, cy, 22, a1 + 45);
                return (
                  <polygon
                    key={i}
                    points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`}
                    fill="#c8a96e"
                    opacity="0.6"
                  />
                );
              })}
              <circle cx={cx} cy={cy} r="6" fill="#e8d08a" opacity="0.9" />

              {/* Надпись по дуге — 193 народа */}
              <path id="topArc" d={`M ${cx - 235},${cy} A 235,235 0 0,1 ${cx + 235},${cy}`} fill="none" />
              <text fontSize="7.5" fontFamily="'IBM Plex Sans', sans-serif" fill="#c8a96e" opacity="0.45" letterSpacing="4">
                <textPath href="#topArc" startOffset="10%">
                  МНОГОНАЦИОНАЛЬНЫЙ НАРОД РОССИЙСКОЙ ФЕДЕРАЦИИ
                </textPath>
              </text>
            </svg>
          </div>

          {/* Цитата */}
          <div
            style={{
              textAlign: "center",
              padding: "24px 32px",
              margin: "0 0 28px",
              background: "rgba(200,169,110,0.04)",
              border: "1px solid rgba(200,169,110,0.12)",
            }}
          >
            <p
              style={{
                fontSize: "1.25rem",
                fontWeight: 300,
                fontStyle: "italic",
                color: "#e8dfc8",
                lineHeight: 1.5,
                marginBottom: "10px",
              }}
            >
              «Мы — единый народ, единая страна,<br />
              мы вместе можем преодолеть любые трудности»
            </p>
            <div
              style={{
                height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(200,169,110,0.4), transparent)",
                margin: "12px auto",
                width: "160px",
              }}
            />
            <p
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                color: "#c8a96e",
                opacity: 0.6,
                fontFamily: "'IBM Plex Sans', sans-serif",
                textTransform: "uppercase",
              }}
            >
              Конституция Российской Федерации, Преамбула
            </p>
          </div>

          {/* Три столпа */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "32px" }}>
            {[
              { icon: "🤝", title: "Сотрудничество", text: "193 народа строят общее будущее" },
              { icon: "🌍", title: "Уважение", text: "Каждая культура — богатство страны" },
              { icon: "⭐", title: "Гордость", text: "Общая история объединяет нас" },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  textAlign: "center",
                  padding: "18px 12px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(200,169,110,0.1)",
                }}
              >
                <div style={{ fontSize: "1.6rem", marginBottom: "8px" }}>{item.icon}</div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#c8a96e",
                    marginBottom: "6px",
                    fontFamily: "'IBM Plex Sans', sans-serif",
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "#e8dfc8",
                    opacity: 0.5,
                    lineHeight: 1.5,
                    fontFamily: "'IBM Plex Sans', sans-serif",
                  }}
                >
                  {item.text}
                </div>
              </div>
            ))}
          </div>

          {/* Подпись */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(200,169,110,0.3), transparent)",
                marginBottom: "16px",
              }}
            />
            <p
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#c8a96e",
                opacity: 0.35,
                fontFamily: "'IBM Plex Sans', sans-serif",
              }}
            >
              Россия · 2024 · Единство в многообразии
            </p>
          </div>
        </div>

        {/* Нижняя полоса */}
        <div style={{ height: "3px", background: "linear-gradient(90deg, transparent, #c8a96e 30%, #e8d08a 50%, #c8a96e 70%, transparent)", opacity: 0.7 }} />
      </div>

      {/* Подсказка */}
      <p
        className="mt-6 text-center text-xs opacity-30"
        style={{ color: "#e8dfc8", fontFamily: "'IBM Plex Sans', sans-serif" }}
      >
        Для скриншота используйте Print Screen или встроенный инструмент снимка экрана
      </p>
    </div>
  );
}
