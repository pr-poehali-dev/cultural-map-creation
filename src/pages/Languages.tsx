import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const STATS = [
  { value: "~190", label: "языков и диалектов", sub: "зафиксировано в России" },
  { value: "37", label: "государственных языков", sub: "в субъектах федерации" },
  { value: "~20", label: "языков под угрозой", sub: "менее 100 носителей" },
  { value: "14", label: "языковых семей", sub: "представлено на территории" },
];

const FAMILIES = [
  { name: "Индоевропейская", count: 39, color: "#c8a96e", examples: "Русский, Осетинский, Армянский" },
  { name: "Алтайская", count: 40, color: "#7a9e7e", examples: "Татарский, Якутский, Монгольский" },
  { name: "Уральская", count: 18, color: "#7b9fc4", examples: "Марийский, Удмуртский, Ненецкий" },
  { name: "Северокавказская", count: 34, color: "#b87a7a", examples: "Чеченский, Аварский, Кабардинский" },
  { name: "Картвельская", count: 2, color: "#9b7ab8", examples: "Грузинский, Мегрельский" },
  { name: "Изолированные", count: 3, color: "#c49a6c", examples: "Нивхский, Кетский, Юкагирский" },
];

const STATUS_DATA = [
  {
    status: "Государственный / официальный",
    icon: "Shield",
    color: "#c8a96e",
    count: 37,
    desc: "Русский язык — единственный государственный на федеральном уровне. 36 языков имеют официальный статус в республиках: татарский, башкирский, чеченский, якутский и другие.",
    examples: ["Русский", "Татарский", "Башкирский", "Чеченский", "Якутский", "Тувинский"],
  },
  {
    status: "Региональный / миноритарный",
    icon: "MapPin",
    color: "#7b9fc4",
    count: 120,
    desc: "Языки малых народов, признанные культурным достоянием. Используются в быту, сохраняются через школы и местные медиа, но не имеют официального статуса.",
    examples: ["Карельский", "Вепсский", "Коми", "Мансийский", "Бурятский", "Адыгейский"],
  },
  {
    status: "Исчезающий",
    icon: "AlertTriangle",
    color: "#c07070",
    count: 22,
    desc: "По данным ЮНЕСКО и переписи 2020 г., около 22 языков находятся под угрозой исчезновения. Среди них языки с числом носителей от нескольких десятков до нескольких сотен человек.",
    examples: ["Кетский (~200)", "Орокский (~100)", "Алюторский (~25)", "Энецкий (~43)", "Чулымский (~44)"],
  },
];

const TIMELINE = [
  {
    year: "XVI–XVII вв.",
    event: "Присоединение Казани, Сибири",
    detail: "Россия становится многонациональным государством. Первый контакт с десятками новых языковых групп.",
    trend: "expand",
  },
  {
    year: "XIX в.",
    event: "Первые записи языков",
    detail: "Академия наук фиксирует языки народов Российской Империи. Создаются первые словари и грамматики тюркских, финно-угорских языков.",
    trend: "study",
  },
  {
    year: "1920–1930-е",
    event: "Советская латинизация",
    detail: "Для 50+ языков создаются письменности на основе латиницы. Открываются школы на родных языках, выходят газеты.",
    trend: "positive",
  },
  {
    year: "1937–1940-е",
    event: "Перевод на кириллицу",
    detail: "Все советские языки переводятся на кириллицу. Языковая политика централизуется, русский язык становится обязательным.",
    trend: "neutral",
  },
  {
    year: "1970–1980-е",
    event: "Русификация",
    detail: "Активное вытеснение национальных языков из образования. Молодёжь переходит на русский, передача родных языков прерывается.",
    trend: "negative",
  },
  {
    year: "1991–2000-е",
    event: "Языковое возрождение",
    detail: "Суверенитет республик. Языки получают официальный статус, создаются национальные университеты, СМИ на родных языках.",
    trend: "positive",
  },
  {
    year: "2010–2020-е",
    event: "Цифровая эпоха",
    detail: "Языки попадают в Wikipedia, соцсети, мобильные приложения. Однако урбанизация продолжает сокращать число носителей редких языков.",
    trend: "neutral",
  },
];

const SUPPORT = [
  {
    icon: "GraduationCap",
    title: "Образование",
    items: [
      "Преподавание в школах на 24 языках народов России",
      "Национальные университеты в республиках",
      "Факультеты родных языков в педагогических вузах",
    ],
  },
  {
    icon: "Tv",
    title: "Медиа и культура",
    items: [
      "Государственное радиовещание на 60+ языках",
      "Национальные телеканалы: ТатарстанТВ, ГТРК Саха и др.",
      "Театры, фестивали и издательства на родных языках",
    ],
  },
  {
    icon: "BookOpen",
    title: "Документация",
    items: [
      "Институт языкознания РАН — архивирование исчезающих языков",
      "Проект «Языки России» — цифровые корпусы текстов",
      "ЮНЕСКО: Атлас исчезающих языков мира",
    ],
  },
  {
    icon: "Smartphone",
    title: "Цифровые инициативы",
    items: [
      "Клавиатуры и раскладки для национальных алфавитов",
      "Wikipedia на 20+ языках народов России",
      "Приложения для изучения татарского, якутского, башкирского",
    ],
  },
];

const trendColor = {
  expand: "#c8a96e",
  study: "#7b9fc4",
  positive: "#7a9e7e",
  negative: "#c07070",
  neutral: "#9b8fa0",
};

export default function Languages() {
  const [activeStatus, setActiveStatus] = useState(0);

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(160deg, #0d0f14 0%, #12161e 40%, #0f1318 100%)",
        fontFamily: "'IBM Plex Sans', sans-serif",
        color: "#e8dfc8",
      }}
    >
      {/* Шапка */}
      <header
        style={{
          borderBottom: "1px solid rgba(200,169,110,0.2)",
          background: "rgba(13,15,20,0.8)",
          backdropFilter: "blur(12px)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity"
            style={{ color: "#c8a96e" }}
          >
            <Icon name="ArrowLeft" size={16} />
            Карта культур
          </Link>
          <span
            className="text-xs tracking-widest uppercase opacity-50"
            style={{ fontFamily: "'Cormorant', serif", letterSpacing: "0.2em" }}
          >
            Инфографика
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Заголовок */}
        <div className="text-center mb-20" style={{ animation: "fadeUp 0.8s ease-out both" }}>
          <p
            className="text-xs tracking-widest uppercase mb-4 opacity-50"
            style={{ letterSpacing: "0.3em" }}
          >
            Лингвистический атлас России
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant', serif",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 300,
              lineHeight: 1.1,
              color: "#e8dfc8",
              marginBottom: "1.5rem",
            }}
          >
            Языки народов России
            <br />
            <span style={{ color: "#c8a96e", fontStyle: "italic" }}>прошлое и настоящее</span>
          </h1>
          <p className="max-w-2xl mx-auto opacity-60 leading-relaxed" style={{ fontSize: "1rem" }}>
            Россия — одна из наиболее лингвистически разнообразных стран мира. На её территории
            сосуществуют языки индоевропейской, алтайской, уральской и северокавказской семей,
            а также уникальные языковые изоляты.
          </p>
        </div>

        {/* Ключевые цифры */}
        <section className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(200,169,110,0.15)",
                  borderRadius: "2px",
                  padding: "1.75rem 1.5rem",
                  animation: `fadeUp 0.6s ease-out ${i * 0.1}s both`,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Cormorant', serif",
                    fontSize: "3rem",
                    fontWeight: 300,
                    color: "#c8a96e",
                    lineHeight: 1,
                    marginBottom: "0.5rem",
                  }}
                >
                  {s.value}
                </div>
                <div className="font-medium text-sm mb-1">{s.label}</div>
                <div className="text-xs opacity-40">{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Языковые семьи — горизонтальная диаграмма */}
        <section className="mb-20">
          <SectionTitle>Языковые семьи</SectionTitle>
          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "2px",
              padding: "2rem",
            }}
          >
            {FAMILIES.map((f, i) => {
              const total = FAMILIES.reduce((a, b) => a + b.count, 0);
              const pct = (f.count / total) * 100;
              return (
                <div key={i} className="mb-5 last:mb-0">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-sm font-medium">{f.name}</span>
                    <span className="text-xs opacity-40">{f.count} языков · {f.examples}</span>
                  </div>
                  <div
                    style={{
                      height: "6px",
                      background: "rgba(255,255,255,0.06)",
                      borderRadius: "1px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${pct}%`,
                        background: f.color,
                        borderRadius: "1px",
                        transition: "width 1s ease-out",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Статус языков — вкладки */}
        <section className="mb-20">
          <SectionTitle>Статус языков</SectionTitle>
          <div className="flex gap-2 mb-6 flex-wrap">
            {STATUS_DATA.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveStatus(i)}
                style={{
                  padding: "0.5rem 1.25rem",
                  fontSize: "0.8rem",
                  border: `1px solid ${activeStatus === i ? s.color : "rgba(255,255,255,0.1)"}`,
                  background: activeStatus === i ? `${s.color}20` : "transparent",
                  color: activeStatus === i ? s.color : "rgba(232,223,200,0.6)",
                  borderRadius: "1px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {s.status}
              </button>
            ))}
          </div>
          {(() => {
            const s = STATUS_DATA[activeStatus];
            return (
              <div
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: `1px solid ${s.color}30`,
                  borderLeft: `3px solid ${s.color}`,
                  borderRadius: "2px",
                  padding: "2rem",
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "2rem",
                  alignItems: "start",
                }}
              >
                <div>
                  <p className="leading-relaxed opacity-80 mb-4" style={{ fontSize: "0.95rem" }}>
                    {s.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {s.examples.map((ex, j) => (
                      <span
                        key={j}
                        style={{
                          background: `${s.color}15`,
                          border: `1px solid ${s.color}30`,
                          color: s.color,
                          padding: "0.25rem 0.75rem",
                          fontSize: "0.78rem",
                          borderRadius: "1px",
                        }}
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ textAlign: "center", minWidth: "100px" }}>
                  <div
                    style={{
                      fontFamily: "'Cormorant', serif",
                      fontSize: "3.5rem",
                      fontWeight: 300,
                      color: s.color,
                      lineHeight: 1,
                    }}
                  >
                    {s.count}
                  </div>
                  <div className="text-xs opacity-40 mt-1">языков</div>
                </div>
              </div>
            );
          })()}
        </section>

        {/* Историческая динамика */}
        <section className="mb-20">
          <SectionTitle>Историческая динамика</SectionTitle>
          <div className="relative">
            {/* Вертикальная линия */}
            <div
              style={{
                position: "absolute",
                left: "120px",
                top: 0,
                bottom: 0,
                width: "1px",
                background: "rgba(200,169,110,0.15)",
              }}
            />
            <div className="space-y-1">
              {TIMELINE.map((t, i) => (
                <div
                  key={i}
                  className="flex gap-0 items-start"
                  style={{ animation: `fadeUp 0.5s ease-out ${i * 0.08}s both` }}
                >
                  <div
                    className="shrink-0 text-right pr-6"
                    style={{ width: "120px", paddingTop: "1rem" }}
                  >
                    <span
                      style={{
                        fontFamily: "'Cormorant', serif",
                        fontSize: "0.9rem",
                        color: "#c8a96e",
                        opacity: 0.7,
                      }}
                    >
                      {t.year}
                    </span>
                  </div>
                  <div style={{ position: "relative", paddingLeft: "1.5rem", flex: 1 }}>
                    {/* Точка */}
                    <div
                      style={{
                        position: "absolute",
                        left: "-4px",
                        top: "1.3rem",
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: trendColor[t.trend as keyof typeof trendColor],
                        border: "2px solid #0d0f14",
                      }}
                    />
                    <div
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        padding: "1rem 1.25rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <div className="font-medium text-sm mb-1">{t.event}</div>
                      <div className="text-xs opacity-50 leading-relaxed">{t.detail}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Легенда */}
          <div className="flex flex-wrap gap-4 mt-6 pl-[120px]">
            {[
              { color: trendColor.positive, label: "Позитивная динамика" },
              { color: trendColor.negative, label: "Давление на языки" },
              { color: trendColor.neutral, label: "Смешанный период" },
              { color: trendColor.expand, label: "Расширение" },
            ].map((l, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: l.color,
                  }}
                />
                <span className="text-xs opacity-50">{l.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Меры поддержки */}
        <section className="mb-20">
          <SectionTitle>Меры поддержки языкового многообразия</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SUPPORT.map((s, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "2px",
                  padding: "1.75rem",
                  animation: `fadeUp 0.5s ease-out ${i * 0.1}s both`,
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      background: "rgba(200,169,110,0.12)",
                      border: "1px solid rgba(200,169,110,0.2)",
                      borderRadius: "2px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon name={s.icon} size={16} style={{ color: "#c8a96e" }} />
                  </div>
                  <span className="font-medium">{s.title}</span>
                </div>
                <ul className="space-y-2">
                  {s.items.map((item, j) => (
                    <li key={j} className="flex gap-2 text-sm opacity-60 leading-relaxed">
                      <span style={{ color: "#c8a96e", flexShrink: 0, marginTop: "2px" }}>·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Угрожаемые языки — акцент */}
        <section className="mb-20">
          <div
            style={{
              background: "rgba(192,112,112,0.06)",
              border: "1px solid rgba(192,112,112,0.2)",
              borderRadius: "2px",
              padding: "2.5rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "'Cormorant', serif",
                fontSize: "1rem",
                color: "#c07070",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "1rem",
                opacity: 0.8,
              }}
            >
              Внимание
            </div>
            <h3
              style={{
                fontFamily: "'Cormorant', serif",
                fontSize: "2rem",
                fontWeight: 300,
                marginBottom: "1rem",
                color: "#e8dfc8",
              }}
            >
              Каждые две недели в мире умирает один язык
            </h3>
            <p className="opacity-50 max-w-2xl mx-auto text-sm leading-relaxed">
              По оценкам ЮНЕСКО, к концу XXI века может исчезнуть до 90% языков планеты.
              В России особую угрозу испытывают языки малых коренных народов Севера, Сибири и
              Дальнего Востока с числом носителей менее 1000 человек.
            </p>
          </div>
        </section>

        {/* Подпись */}
        <footer
          className="text-center pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs opacity-30">
            Источники: Перепись населения России 2020 г. · Институт языкознания РАН ·
            Атлас языков мира под угрозой исчезновения ЮНЕСКО · Конституция РФ и законы субъектов
          </p>
        </footer>
      </main>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <h2
        style={{
          fontFamily: "'Cormorant', serif",
          fontSize: "1.75rem",
          fontWeight: 300,
          color: "#e8dfc8",
        }}
      >
        {children}
      </h2>
      <div style={{ flex: 1, height: "1px", background: "rgba(200,169,110,0.15)" }} />
    </div>
  );
}