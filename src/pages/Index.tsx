import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const HERO_IMG = 'https://cdn.poehali.dev/projects/c2867365-4bcb-447a-8d6e-dcf21cd3fc1a/files/fb5d6c9e-8d26-40f2-8ed9-a7fe1ee37e1d.jpg';

const NAV = [
  { id: 'home', label: 'Главная' },
  { id: 'catalog', label: 'Каталог' },
  { id: 'warranty', label: 'Гарантия' },
  { id: 'delivery', label: 'Доставка' },
  { id: 'about', label: 'О компании' },
  { id: 'contacts', label: 'Контакты' },
];

interface Motor {
  id: number;
  name: string;
  brand: string;
  power: number;
  type: 'Бензиновый' | 'Электрический';
  price: number;
  stroke: string;
}

const MOTORS: Motor[] = [
  { id: 1, name: 'HDX T 9.8', brand: 'HDX', power: 9.8, type: 'Бензиновый', price: 89900, stroke: '2-тактный' },
  { id: 2, name: 'Hangkai 6.0', brand: 'Hangkai', power: 6, type: 'Бензиновый', price: 54900, stroke: '4-тактный' },
  { id: 3, name: 'Parsun F15', brand: 'Parsun', power: 15, type: 'Бензиновый', price: 142000, stroke: '4-тактный' },
  { id: 4, name: 'Hidea HD 40', brand: 'Hidea', power: 40, type: 'Бензиновый', price: 289000, stroke: '2-тактный' },
  { id: 5, name: 'Mikatsu M 9.9', brand: 'Mikatsu', power: 9.9, type: 'Бензиновый', price: 96500, stroke: '4-тактный' },
  { id: 6, name: 'Hangkai E-Drive', brand: 'Hangkai', power: 5, type: 'Электрический', price: 47000, stroke: 'Электро' },
  { id: 7, name: 'Parsun E-Prop', brand: 'Parsun', power: 3, type: 'Электрический', price: 32900, stroke: 'Электро' },
  { id: 8, name: 'HDX Power 60', brand: 'HDX', power: 60, type: 'Бензиновый', price: 412000, stroke: '2-тактный' },
  { id: 9, name: 'Hidea HD 2.5', brand: 'Hidea', power: 2.5, type: 'Бензиновый', price: 28900, stroke: '4-тактный' },
];

const BRANDS = ['HDX', 'Hangkai', 'Parsun', 'Hidea', 'Mikatsu'];
const TYPES = ['Бензиновый', 'Электрический'];

function fmt(n: number) {
  return n.toLocaleString('ru-RU') + ' ₽';
}

const Index = () => {
  const [brand, setBrand] = useState<string>('all');
  const [type, setType] = useState<string>('all');
  const [power, setPower] = useState<[number]>([60]);
  const [price, setPrice] = useState<[number]>([450000]);

  const filtered = useMemo(() => {
    return MOTORS.filter((m) =>
      (brand === 'all' || m.brand === brand) &&
      (type === 'all' || m.type === type) &&
      m.power <= power[0] &&
      m.price <= price[0]
    );
  }, [brand, type, power, price]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <button onClick={() => scrollTo('home')} className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Icon name="Anchor" size={20} className="text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl tracking-wide">MARINE<span className="text-primary">POWER</span></span>
          </button>
          <nav className="hidden md:flex items-center gap-7">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {n.label}
              </button>
            ))}
          </nav>
          <Button onClick={() => scrollTo('contacts')} className="font-display tracking-wide">Заказать</Button>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative pt-32 pb-24 overflow-hidden mesh-bg">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="container relative grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <Badge className="mb-5 bg-accent text-accent-foreground font-display tracking-wider">ПРЯМЫЕ ПОСТАВКИ ИЗ КИТАЯ</Badge>
            <h1 className="font-display font-bold text-5xl md:text-7xl leading-[0.95] mb-6">
              ЯПОНСКИЕ<br /><span className="text-primary text-glow">МОЩНОСТИ</span> —<br />КИТАЙСКАЯ <span className="text-accent">ЦЕНА</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-md mb-8">
              Подвесные лодочные моторы с ресурсом мировых брендов по цене в 2–3 раза ниже. Гарантия до 3 лет, доставка по всей России.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => scrollTo('catalog')} className="font-display tracking-wide text-base bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/30">
                <Icon name="Search" size={18} className="mr-2" />Подобрать мотор
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo('about')} className="font-display tracking-wide text-base border-primary/40">
                О компании
              </Button>
            </div>
            <div className="flex flex-wrap gap-5 mt-8">
              {[
                { icon: 'ShieldCheck', t: 'Гарантия 3 года' },
                { icon: 'Truck', t: 'Доставка по РФ' },
                { icon: 'Wrench', t: 'Сервис и запчасти' },
              ].map((c) => (
                <div key={c.t} className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center">
                    <Icon name={c.icon} size={18} className="text-primary" />
                  </div>
                  <span className="text-sm font-medium">{c.t}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-8 mt-12">
              {[['500+', 'моторов на складе'], ['12', 'лет на рынке'], ['3 года', 'гарантии']].map(([v, l]) => (
                <div key={l}>
                  <div className="font-display font-bold text-3xl text-primary">{v}</div>
                  <div className="text-xs text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-fade-in">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-glow" />
            <img src={HERO_IMG} alt="Лодочный мотор" className="relative rounded-3xl w-full animate-float shadow-2xl border border-border" />
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="py-24">
        <div className="container">
          <div className="mb-10">
            <Badge variant="outline" className="mb-3 border-primary/40 text-primary font-display tracking-wider">КАТАЛОГ</Badge>
            <h2 className="font-display font-bold text-4xl md:text-5xl">Подберите свой мотор</h2>
          </div>

          <div className="grid lg:grid-cols-[300px_1fr] gap-8">
            {/* Filters */}
            <Card className="p-6 h-fit bg-card border-border space-y-6 lg:sticky lg:top-20">
              <div className="flex items-center gap-2 font-display font-semibold text-lg">
                <Icon name="SlidersHorizontal" size={18} className="text-primary" /> Фильтры
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Производитель</label>
                <Select value={brand} onValueChange={setBrand}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все производители</SelectItem>
                    {BRANDS.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Тип двигателя</label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все типы</SelectItem>
                    {TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <label className="text-sm text-muted-foreground flex justify-between">
                  Мощность <span className="text-primary font-medium">до {power[0]} л.с.</span>
                </label>
                <Slider value={power} onValueChange={(v) => setPower(v as [number])} min={2} max={60} step={1} />
              </div>
              <div className="space-y-3">
                <label className="text-sm text-muted-foreground flex justify-between">
                  Цена <span className="text-primary font-medium">до {fmt(price[0])}</span>
                </label>
                <Slider value={price} onValueChange={(v) => setPrice(v as [number])} min={28000} max={450000} step={1000} />
              </div>
              <Button variant="outline" className="w-full" onClick={() => { setBrand('all'); setType('all'); setPower([60]); setPrice([450000]); }}>
                <Icon name="RotateCcw" size={16} className="mr-2" />Сбросить
              </Button>
            </Card>

            {/* Grid */}
            <div>
              <div className="text-sm text-muted-foreground mb-4">Найдено: <span className="text-foreground font-medium">{filtered.length}</span></div>
              {filtered.length === 0 ? (
                <Card className="p-12 text-center text-muted-foreground">
                  <Icon name="SearchX" size={40} className="mx-auto mb-3 text-muted-foreground" />
                  Ничего не найдено. Измените параметры фильтра.
                </Card>
              ) : (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filtered.map((m) => (
                    <Card key={m.id} className="group p-5 bg-card border-border hover:border-primary/60 transition-all hover:-translate-y-1">
                      <div className="aspect-square rounded-xl bg-secondary mb-4 overflow-hidden flex items-center justify-center">
                        <img src={HERO_IMG} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">{m.brand}</Badge>
                        <Badge className={m.type === 'Электрический' ? 'bg-primary text-primary-foreground text-xs' : 'bg-accent text-accent-foreground text-xs'}>{m.type}</Badge>
                      </div>
                      <h3 className="font-display font-semibold text-lg mb-3">{m.name}</h3>
                      <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1"><Icon name="Zap" size={14} className="text-primary" />{m.power} л.с.</span>
                        <span className="flex items-center gap-1"><Icon name="Settings" size={14} className="text-primary" />{m.stroke}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-xl text-primary">{fmt(m.price)}</span>
                        <Button size="sm" onClick={() => scrollTo('contacts')}>В корзину</Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Warranty */}
      <section id="warranty" className="py-24 bg-secondary/30">
        <div className="container">
          <Badge variant="outline" className="mb-3 border-primary/40 text-primary font-display tracking-wider">ГАРАНТИЯ</Badge>
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-10">Уверенность в каждом моторе</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: 'ShieldCheck', t: 'До 3 лет гарантии', d: 'Официальная гарантия производителя на все моторы из каталога.' },
              { icon: 'Wrench', t: 'Сервисные центры', d: 'Авторизованное обслуживание и оригинальные запчасти в наличии.' },
              { icon: 'BadgeCheck', t: 'Сертификаты', d: 'Все моторы сертифицированы и проходят предпродажную проверку.' },
            ].map((c) => (
              <Card key={c.t} className="p-7 bg-card border-border">
                <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mb-4">
                  <Icon name={c.icon} size={24} className="text-primary" />
                </div>
                <h3 className="font-display font-semibold text-xl mb-2">{c.t}</h3>
                <p className="text-muted-foreground text-sm">{c.d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery */}
      <section id="delivery" className="py-24">
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="outline" className="mb-3 border-primary/40 text-primary font-display tracking-wider">ДОСТАВКА</Badge>
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">Привезём к воде</h2>
            <div className="space-y-4">
              {[
                { icon: 'Truck', t: 'Доставка по всей России', d: 'Транспортными компаниями СДЭК, ПЭК, Деловые линии.' },
                { icon: 'Package', t: 'Бережная упаковка', d: 'Каждый мотор надёжно упакован для дальней перевозки.' },
                { icon: 'MapPin', t: 'Самовывоз со склада', d: 'Заберите заказ самостоятельно в удобное время.' },
                { icon: 'Clock', t: 'Сроки 2–7 дней', d: 'Зависит от региона. По Москве — день в день.' },
              ].map((c) => (
                <div key={c.t} className="flex gap-4">
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-primary/15 flex items-center justify-center">
                    <Icon name={c.icon} size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold">{c.t}</h3>
                    <p className="text-muted-foreground text-sm">{c.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Card className="p-8 bg-card border-border mesh-bg">
            <Icon name="Calculator" size={32} className="text-primary mb-4" />
            <h3 className="font-display font-bold text-2xl mb-3">Рассчитать доставку</h3>
            <p className="text-muted-foreground mb-6">Укажите город и мы рассчитаем точную стоимость и сроки доставки вашего мотора.</p>
            <Button size="lg" className="font-display tracking-wide" onClick={() => scrollTo('contacts')}>
              <Icon name="Send" size={18} className="mr-2" />Узнать стоимость
            </Button>
          </Card>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 bg-secondary/30">
        <div className="container">
          <Badge variant="outline" className="mb-3 border-primary/40 text-primary font-display tracking-wider">О КОМПАНИИ</Badge>
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-6 max-w-2xl">12 лет поставляем моторы из Китая</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mb-10">
            MarinePower — прямой импортёр подвесных лодочных моторов ведущих китайских брендов. Мы работаем без посредников, поэтому держим лучшие цены на рынке и гарантируем качество каждого мотора.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'Ship', v: '8000+', l: 'довольных клиентов' },
              { icon: 'Boxes', v: '500+', l: 'моделей в наличии' },
              { icon: 'Globe', v: '85', l: 'регионов доставки' },
              { icon: 'Star', v: '4.9', l: 'рейтинг покупателей' },
            ].map((c) => (
              <Card key={c.l} className="p-6 bg-card border-border text-center">
                <Icon name={c.icon} size={28} className="text-primary mx-auto mb-3" />
                <div className="font-display font-bold text-3xl">{c.v}</div>
                <div className="text-sm text-muted-foreground">{c.l}</div>
              </Card>
            ))}
          </div>

          <div className="mt-12 max-w-2xl">
            <h3 className="font-display font-bold text-2xl mb-4">Частые вопросы</h3>
            <Accordion type="single" collapsible>
              {[
                { q: 'Чем отличаются 2-тактные и 4-тактные моторы?', a: '2-тактные легче и дешевле, 4-тактные экономичнее и тише. Поможем выбрать под ваши задачи.' },
                { q: 'Подходят ли моторы для надувных лодок ПВХ?', a: 'Да, в каталоге есть моторы любой мощности — от 2.5 до 60 л.с. для разных типов лодок.' },
                { q: 'Можно ли оформить рассрочку?', a: 'Да, доступна рассрочка и кредит от банков-партнёров. Подробности уточняйте у менеджера.' },
              ].map((f) => (
                <AccordionItem key={f.q} value={f.q}>
                  <AccordionTrigger className="font-display text-left">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="py-24">
        <div className="container">
          <div className="rounded-3xl border border-border bg-card mesh-bg p-8 md:p-14 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <Badge variant="outline" className="mb-3 border-primary/40 text-primary font-display tracking-wider">КОНТАКТЫ</Badge>
              <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">Готовы помочь с выбором</h2>
              <div className="space-y-4">
                {[
                  { icon: 'Phone', t: '+7 (800) 555-35-35', s: 'Звонок бесплатный' },
                  { icon: 'Mail', t: 'sales@marinepower.ru', s: 'Ответим в течение часа' },
                  { icon: 'MapPin', t: 'Москва, ул. Портовая, 12', s: 'Склад и шоурум' },
                  { icon: 'Clock', t: 'Пн–Вс: 9:00–20:00', s: 'Без выходных' },
                ].map((c) => (
                  <div key={c.t} className="flex gap-4 items-center">
                    <div className="w-11 h-11 shrink-0 rounded-xl bg-primary/15 flex items-center justify-center">
                      <Icon name={c.icon} size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-display font-semibold">{c.t}</div>
                      <div className="text-muted-foreground text-sm">{c.s}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Card className="p-7 bg-background border-border space-y-4">
              <h3 className="font-display font-bold text-2xl">Оставить заявку</h3>
              <input placeholder="Ваше имя" className="w-full h-11 px-4 rounded-lg bg-secondary border border-border focus:border-primary outline-none transition-colors" />
              <input placeholder="Телефон" className="w-full h-11 px-4 rounded-lg bg-secondary border border-border focus:border-primary outline-none transition-colors" />
              <textarea placeholder="Какой мотор вас интересует?" rows={3} className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary outline-none transition-colors resize-none" />
              <Button size="lg" className="w-full font-display tracking-wide">
                <Icon name="Send" size={18} className="mr-2" />Отправить заявку
              </Button>
              <p className="text-xs text-muted-foreground text-center">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Icon name="Anchor" size={18} className="text-primary-foreground" />
            </div>
            <span className="font-display font-bold tracking-wide">MARINE<span className="text-primary">POWER</span></span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 MarinePower. Подвесные лодочные моторы из Китая.</p>
          <div className="flex gap-3">
            {['Send', 'MessageCircle', 'Phone'].map((i) => (
              <button key={i} className="w-9 h-9 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center">
                <Icon name={i} size={16} />
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;