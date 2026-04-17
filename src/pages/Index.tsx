import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const REGIONS = [
  {
    id: "siberia",
    name: "Сибирь",
    subtitle: "Охота, шаманизм, таёжные обряды",
    color: "#4a6741",
    x: 62,
    y: 28,
    traditions: [
      {
        title: "Шаманские обряды народов Сибири",
        category: "Духовные практики",
        description:
          "Шаманизм — древнейшая религиозно-магическая система, сохранившаяся у народов Сибири: якутов, бурят, тувинцев и эвенков. Шаман (кам, удаган) выступает посредником между миром людей и духов. Обряды включают камлание — ритуальный транс под звуки бубна, во время которого шаман путешествует по трём мирам: верхнему, среднему и нижнему. Традиция передаётся строго по наследству и сопровождается многолетним ученичеством.",
      },
      {
        title: "Праздник Ысыах",
        category: "Народные праздники",
        description:
          "Якутский народный праздник, знаменующий начало лета и встречу с солнцем. Проводится в конце июня и сопровождается кумысопитием, национальными играми, ритуальными песнопениями осуохай — круговыми хороводами, которые могут длиться несколько часов. Праздник олицетворяет единство человека с природой и благодарность за возрождение жизни.",
      },
      {
        title: "Традиции охоты и тайга",
        category: "Промысловая культура",
        description:
          "Охотничьи традиции коренных народов Сибири пронизаны уважением к природе. Перед охотой совершаются специальные ритуалы задабривания духов леса. Убитый зверь провожается по особым обрядам — охотник просит прощения и благодарит животное за жертву. Эти традиции формировали особый этос бережного отношения к природным ресурсам.",
      },
    ],
  },
  {
    id: "caucasus",
    name: "Кавказ",
    subtitle: "Горские традиции, гостеприимство",
    color: "#8b4513",
    x: 36,
    y: 58,
    traditions: [
      {
        title: "Адат — горский обычай",
        category: "Правовые традиции",
        description:
          "Адат представляет собой систему неписаных законов и обычаев горских народов Кавказа, регулирующих все стороны жизни общества: семейные отношения, землевладение, разрешение споров, кровную месть и примирение. Адат складывался тысячелетиями и во многом определяет поведение людей даже в современном обществе, переплетаясь с нормами ислама.",
      },
      {
        title: "Куначество и гостеприимство",
        category: "Социальные связи",
        description:
          "Гостеприимство на Кавказе — священный долг и высшая добродетель. Гость приравнивается к члену семьи: хозяин обязан защищать его даже ценой жизни. Куначество — особая форма побратимства между представителями разных родов и народов, создававшая сети взаимопомощи через горные перевалы. Отказать в гостеприимстве считалось тяжким позором.",
      },
      {
        title: "Лезгинка и танцевальные традиции",
        category: "Искусство и танец",
        description:
          "Лезгинка — темпераментный танец народов Кавказа, в котором мужчина изображает орла, а женщина — лебедя. Танец строго кодифицирован: мужчина никогда не касается женщины руками, демонстрируя уважение. Существуют десятки локальных вариантов лезгинки у разных народов — чеченцев, аварцев, лезгин. Танец исполняется на свадьбах и праздниках и является важнейшим маркером этнической идентичности.",
      },
    ],
  },
  {
    id: "volga",
    name: "Поволжье",
    subtitle: "Финно-угорские и тюркские традиции",
    color: "#6b5b8f",
    x: 47,
    y: 36,
    traditions: [
      {
        title: "Сабантуй — праздник плуга",
        category: "Народные праздники",
        description:
          "Татарский и башкирский праздник окончания весенних полевых работ. Проводится в июне после завершения посева. Сабантуй включает спортивные состязания (борьба на кушаках — куреш, скачки, бег в мешках), угощения и ярмарку. В древности носил ритуальный характер и был связан с задабриванием духов земли перед посевом. Сегодня признан объектом нематериального наследия ЮНЕСКО.",
      },
      {
        title: "Священные рощи народов Мари",
        category: "Духовные практики",
        description:
          "Марийцы сохранили дохристианскую религию — марийскую традиционную веру. В священных рощах — кюсото — проводятся моления под руководством жрецов-картов. Эти рощи тысячелетиями служат местами связи с богами и духами предков. Никакой строительной деятельности в священных рощах не допускается, они тщательно охраняются общиной.",
      },
      {
        title: "Чувашские вышивки и орнаменты",
        category: "Декоративное искусство",
        description:
          "Чувашская вышивка — уникальная система знаков и символов, кодировавшая информацию о роде, статусе и пожеланиях владельца одежды. Каждый элемент орнамента имел конкретное значение: обереги от сглаза, символы плодородия, знаки солнца. Традиционный женский костюм мог содержать тысячи стежков, сделанных вручную. Искусство передавалось от матери к дочери.",
      },
    ],
  },
  {
    id: "north",
    name: "Русский Север",
    subtitle: "Поморы, эпосы, деревянное зодчество",
    color: "#2c5f7a",
    x: 42,
    y: 16,
    traditions: [
      {
        title: "Поморские промыслы",
        category: "Промысловая культура",
        description:
          "Поморы — потомки новгородских переселенцев, освоившие берега Белого и Баренцева морей. Морской промысел требовал особого мужества и коллективизма: артели уходили на зверобойку и рыбалку на месяцы. Сложились специфические профессиональные традиции, язык (поморское наречие) и духовная культура, проникнутая образами моря. Поморы первыми освоили арктические архипелаги.",
      },
      {
        title: "Северные былины",
        category: "Фольклор",
        description:
          "Именно Русский Север сохранил живую традицию эпического пения — исполнения былин. В XIX веке здесь были записаны тысячи текстов о богатырях Илье Муромце, Добрыне Никитиче и Алёше Поповиче. Сказители — были — хранили обширные репертуары и пользовались большим уважением. Особый распев-речитатив, характерный для северных былин, отличается от южнорусских вариантов.",
      },
      {
        title: "Деревянное зодчество",
        category: "Архитектура",
        description:
          "Русский Север подарил миру шедевры деревянного зодчества: знаменитые церкви Кижей, многоглавые храмы без единого гвоздя. Плотницкое мастерство передавалось из поколения в поколение: срубы ставились с учётом розы ветров и особенностей почвы. Традиционный северный дом объединял жилые и хозяйственные помещения под одной крышей, что диктовалось суровым климатом.",
      },
    ],
  },
  {
    id: "urals",
    name: "Урал",
    subtitle: "Горнозаводская культура, Бажов",
    color: "#5a5a7a",
    x: 55,
    y: 35,
    traditions: [
      {
        title: "Горнозаводская цивилизация",
        category: "Трудовые традиции",
        description:
          "Уральские заводы XVIII–XIX веков создали уникальную цивилизацию мастеров. Потомственные рабочие династии передавали секреты ремесла поколениями. Возникли особые профессиональные субкультуры: кузнецов, литейщиков, камнерезов. Уральские мастера были крепостными, но их положение существенно отличалось от крестьянского — они пользовались относительной свободой передвижения и имели профессиональный статус.",
      },
      {
        title: "Сказы Бажова и горные духи",
        category: "Фольклор",
        description:
          "Павел Бажов записал и литературно обработал уральские горнозаводские предания. Хозяйка Медной горы, Великий Полоз, Огневушка-Поскакушка — персонажи уральской мифологии, одушевляющие природные силы и хранящие горные богатства. За этими образами стоит реальная народная вера в духов-хозяев горных пород и подземных богатств, унаследованная от финно-угорских народов.",
      },
    ],
  },
  {
    id: "fareast",
    name: "Дальний Восток",
    subtitle: "Народы моря, нивхи, нанайцы",
    color: "#3a7a6a",
    x: 80,
    y: 32,
    traditions: [
      {
        title: "Медвежий праздник",
        category: "Духовные практики",
        description:
          "Медвежий праздник — центральный ритуал многих народов Дальнего Востока: нивхов, айнов, орочей, удэгейцев. Медведь считается прародителем рода и священным животным. Выращенного в плену медведя торжественно отправляют к предкам в сопровождении ритуальных танцев, угощений и молений. Праздник длится несколько дней и укрепляет связи между родовыми кланами.",
      },
      {
        title: "Рыболовные традиции нанайцев",
        category: "Промысловая культура",
        description:
          "Нанайцы — «люди реки» — создали богатейшую культуру, связанную с Амуром. Рыбная ловля сопровождалась сложными ритуалами умилостивления духов воды. Из рыбьей кожи изготавливали одежду, обувь и украшения — нанайская рыбья кожа отличается прочностью и влагостойкостью. Орнаменты нанайского искусства узнаваемы по спирально-завитковым мотивам.",
      },
    ],
  },
];

type View = "map" | "regions" | "search";

export default function Index() {
  const [view, setView] = useState<View>("map");
  const [selectedRegion, setSelectedRegion] = useState<(typeof REGIONS)[0] | null>(null);
  const [selectedTradition, setSelectedTradition] = useState<(typeof REGIONS)[0]["traditions"][0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults =
    searchQuery.trim().length >= 2
      ? REGIONS.flatMap((r) =>
          r.traditions
            .filter(
              (t) =>
                t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((t) => ({ ...t, regionName: r.name, regionColor: r.color }))
        )
      : [];

  const openTradition = (tradition: (typeof REGIONS)[0]["traditions"][0]) => {
    setSelectedTradition(tradition);
  };

  const closeTradition = () => setSelectedTradition(null);

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1
              className="text-2xl font-light tracking-wide text-foreground"
              style={{ fontFamily: "'Cormorant', serif", letterSpacing: "0.04em" }}
            >
              Традиции России
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5 tracking-widest uppercase">
              Карта культурного наследия
            </p>
          </div>
          <nav className="flex items-center gap-1">
            <Link
              to="/languages"
              className="flex items-center gap-2 px-4 py-2 text-sm rounded transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-secondary"
            >
              <Icon name="Languages" size={15} />
              Языки народов
            </Link>
            <Link
              to="/poster"
              className="flex items-center gap-2 px-4 py-2 text-sm rounded transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-secondary mr-2"
            >
              <Icon name="Star" size={15} />
              Плакат
            </Link>
            {(["map", "regions", "search"] as View[]).map((v) => {
              const labels: Record<View, string> = { map: "Карта", regions: "Регионы", search: "Поиск" };
              const icons: Record<View, string> = { map: "Map", regions: "BookOpen", search: "Search" };
              return (
                <button
                  key={v}
                  onClick={() => {
                    setView(v);
                    setSelectedRegion(null);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 text-sm rounded transition-all duration-200 ${
                    view === v
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <Icon name={icons[v]} size={15} />
                  {labels[v]}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* MAP VIEW */}
        {view === "map" && !selectedRegion && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h2
                className="text-4xl font-light text-foreground mb-2"
                style={{ fontFamily: "'Cormorant', serif" }}
              >
                Интерактивная карта
              </h2>
              <p className="text-muted-foreground text-sm">Выберите регион, чтобы изучить его традиции</p>
            </div>
            <div
              className="relative bg-secondary/40 rounded-lg overflow-hidden"
              style={{ paddingBottom: "52%" }}
            >
              <svg
                viewBox="0 0 100 55"
                className="absolute inset-0 w-full h-full"
                style={{
                  background: "linear-gradient(135deg, hsl(210,30%,94%) 0%, hsl(36,15%,93%) 100%)",
                }}
              >
                <path
                  d="M18,8 L22,6 L30,7 L38,5 L48,6 L58,4 L70,5 L80,6 L88,8 L92,12 L90,18 L85,22 L88,28 L85,34 L80,36 L75,40 L70,38 L65,42 L60,44 L55,42 L50,44 L45,46 L40,44 L35,48 L30,46 L25,48 L20,46 L16,42 L14,36 L12,28 L14,20 L16,14 Z"
                  fill="hsl(36,20%,88%)"
                  stroke="hsl(36,15%,78%)"
                  strokeWidth="0.3"
                />
                <path
                  d="M48,6 L46,15 L44,24 L42,34 L40,44"
                  stroke="hsl(210,40%,75%)"
                  strokeWidth="0.2"
                  fill="none"
                  opacity="0.6"
                />
                <path
                  d="M62,5 L60,14 L58,22 L56,32"
                  stroke="hsl(210,40%,75%)"
                  strokeWidth="0.15"
                  fill="none"
                  opacity="0.5"
                />
                {REGIONS.map((region) => (
                  <g
                    key={region.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedRegion(region)}
                  >
                    <circle cx={region.x} cy={region.y} r="5.5" fill={region.color} opacity="0.15" />
                    <circle
                      cx={region.x}
                      cy={region.y}
                      r="3.5"
                      fill={region.color}
                      opacity="0.85"
                      className="transition-all duration-200"
                    />
                    <text
                      x={region.x}
                      y={region.y + 8}
                      textAnchor="middle"
                      fontSize="2.2"
                      fill={region.color}
                      fontFamily="IBM Plex Sans, sans-serif"
                      fontWeight="500"
                    >
                      {region.name}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
              {REGIONS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRegion(r)}
                  className="text-left p-4 rounded border border-border hover:border-foreground/30 hover:bg-secondary/60 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: r.color }}
                    />
                    <span className="font-medium text-sm text-foreground">{r.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{r.subtitle}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {view === "map" && selectedRegion && (
          <RegionDetail
            region={selectedRegion}
            onBack={() => setSelectedRegion(null)}
            onOpenTradition={openTradition}
          />
        )}

        {/* REGIONS VIEW */}
        {view === "regions" && !selectedRegion && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h2
                className="text-4xl font-light text-foreground mb-2"
                style={{ fontFamily: "'Cormorant', serif" }}
              >
                Регионы России
              </h2>
              <p className="text-muted-foreground text-sm">
                {REGIONS.length} регионов ·{" "}
                {REGIONS.reduce((a, r) => a + r.traditions.length, 0)} традиций
              </p>
            </div>
            <div className="space-y-3">
              {REGIONS.map((region, i) => (
                <button
                  key={region.id}
                  onClick={() => setSelectedRegion(region)}
                  className="w-full text-left p-5 rounded border border-border hover:border-foreground/30 bg-card hover:bg-secondary/40 transition-all duration-200 group animate-fade-in"
                  style={{ animationDelay: `${i * 0.07}s`, opacity: 0 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: region.color }}
                      />
                      <div>
                        <h3 className="font-medium text-foreground text-base">{region.name}</h3>
                        <p className="text-sm text-muted-foreground mt-0.5">{region.subtitle}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <span className="text-xs">{region.traditions.length} традиции</span>
                      <Icon
                        name="ChevronRight"
                        size={16}
                        className="group-hover:translate-x-1 transition-transform duration-200"
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {view === "regions" && selectedRegion && (
          <RegionDetail
            region={selectedRegion}
            onBack={() => setSelectedRegion(null)}
            onOpenTradition={openTradition}
          />
        )}

        {/* SEARCH VIEW */}
        {view === "search" && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h2
                className="text-4xl font-light text-foreground mb-2"
                style={{ fontFamily: "'Cormorant', serif" }}
              >
                Поиск традиций
              </h2>
              <p className="text-muted-foreground text-sm">
                Введите название традиции, региона или категории
              </p>
            </div>
            <div className="relative mb-8">
              <Icon
                name="Search"
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Например: шаманизм, свадьба, Урал..."
                className="w-full pl-11 pr-4 py-3.5 bg-card border border-border rounded text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/30 focus:border-foreground/40 text-sm transition-all"
                autoFocus
              />
            </div>

            {searchQuery.trim().length >= 2 && (
              <div>
                <p className="text-xs text-muted-foreground mb-4 tracking-wide uppercase">
                  {searchResults.length > 0
                    ? `Найдено: ${searchResults.length}`
                    : "Ничего не найдено"}
                </p>
                <div className="space-y-3">
                  {searchResults.map((result, i) => (
                    <button
                      key={i}
                      onClick={() => openTradition(result)}
                      className="w-full text-left p-5 rounded border border-border hover:border-foreground/30 bg-card hover:bg-secondary/40 transition-all duration-200 animate-fade-in"
                      style={{ animationDelay: `${i * 0.05}s`, opacity: 0 }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="w-2 h-2 rounded-full flex-shrink-0"
                              style={{ backgroundColor: result.regionColor }}
                            />
                            <span className="text-xs text-muted-foreground">
                              {result.regionName} · {result.category}
                            </span>
                          </div>
                          <h3 className="font-medium text-foreground text-sm">{result.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {result.description}
                          </p>
                        </div>
                        <Icon
                          name="ChevronRight"
                          size={16}
                          className="text-muted-foreground flex-shrink-0 mt-1"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {searchQuery.trim().length === 0 && (
              <div className="text-center py-16">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <Icon name="BookOpen" size={20} className="text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm">Начните вводить запрос</p>
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                  {["шаманизм", "гостеприимство", "лезгинка", "сабантуй", "поморы"].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="text-xs px-3 py-1.5 bg-secondary hover:bg-foreground hover:text-background text-foreground rounded transition-all duration-200"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Tradition Modal */}
      {selectedTradition && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm"
          onClick={closeTradition}
        >
          <div
            className="bg-card w-full max-w-2xl rounded-lg border border-border shadow-2xl animate-slide-up max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
              <span className="text-xs text-muted-foreground tracking-widest uppercase">
                {selectedTradition.category}
              </span>
              <button
                onClick={closeTradition}
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
            <div className="px-6 py-6">
              <h2
                className="text-3xl font-light text-foreground mb-6 leading-tight"
                style={{ fontFamily: "'Cormorant', serif" }}
              >
                {selectedTradition.title}
              </h2>
              <p className="text-sm text-foreground/80 leading-relaxed" style={{ lineHeight: "1.85" }}>
                {selectedTradition.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RegionDetail({
  region,
  onBack,
  onOpenTradition,
}: {
  region: (typeof REGIONS)[0];
  onBack: () => void;
  onOpenTradition: (t: (typeof REGIONS)[0]["traditions"][0]) => void;
}) {
  return (
    <div className="animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors group"
      >
        <Icon
          name="ArrowLeft"
          size={16}
          className="group-hover:-translate-x-1 transition-transform duration-200"
        />
        Назад
      </button>
      <div className="mb-8 pb-6 border-b border-border">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: region.color }} />
          <h2
            className="text-4xl font-light text-foreground"
            style={{ fontFamily: "'Cormorant', serif" }}
          >
            {region.name}
          </h2>
        </div>
        <p className="text-muted-foreground text-sm pl-7">{region.subtitle}</p>
      </div>

      <p className="text-xs text-muted-foreground tracking-widest uppercase mb-4">
        Традиции · {region.traditions.length}
      </p>

      <div className="space-y-3">
        {region.traditions.map((tradition, i) => (
          <button
            key={i}
            onClick={() => onOpenTradition(tradition)}
            className="w-full text-left p-5 rounded border border-border hover:border-foreground/30 bg-card hover:bg-secondary/40 transition-all duration-200 group animate-fade-in"
            style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <span
                  className="inline-block text-xs px-2 py-0.5 rounded mb-2 text-white"
                  style={{ backgroundColor: region.color, opacity: 0.85 }}
                >
                  {tradition.category}
                </span>
                <h3
                  className="text-lg font-light text-foreground mb-2"
                  style={{ fontFamily: "'Cormorant', serif" }}
                >
                  {tradition.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {tradition.description}
                </p>
              </div>
              <Icon
                name="ChevronRight"
                size={16}
                className="text-muted-foreground flex-shrink-0 mt-1 group-hover:translate-x-1 transition-transform duration-200"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}