export default function CtaSection() {
  return (
    <section id="about" className="bg-[#14120f] py-24 px-6 md:px-20 border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-[#14a800] text-sm font-bold tracking-widest uppercase mb-4">Начните прямо сейчас</p>
        <h2 className="text-white text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Workflow — платформа,<br />которой доверяют
        </h2>
        <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Мы объединяем клиентов и специалистов по всему Узбекистану. Найдите нужного мастера 
          или начните получать заказы — всё в одном месте.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/sign-up"
            className="inline-flex items-center justify-center gap-2 bg-[#14a800] hover:bg-[#108a00] text-white font-semibold px-10 py-4 rounded-full transition-colors text-base"
          >
            Найти специалиста
          </a>
          <a
            href="/sign-up"
            className="inline-flex items-center justify-center gap-2 border border-white/25 text-white/80 hover:text-white hover:bg-white/8 font-semibold px-10 py-4 rounded-full transition-colors text-base"
          >
            Начать зарабатывать
          </a>
        </div>
        <p className="text-white/30 text-sm mt-6">Регистрация бесплатна. Без скрытых платежей.</p>
      </div>
    </section>
  );
}
