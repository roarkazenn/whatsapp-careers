export function Banner() {
  return (
    <section className="relative bg-whatsapp-green text-white overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-40">
        <video
          className="w-full h-full object-cover opacity-50"
          autoPlay
          loop
          muted
          playsInline
        >
          <source 
            src="https://cdn.coverr.co/videos/coverr-team-working-in-an-office-1573/1080p.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Bạn đã sẵn sàng làm việc cùng WhatsApp?</h2>
          <p className="text-lg md:text-xl mb-8">Cùng chúng tôi xây dựng nền tảng kết nối hàng tỷ người dùng trên toàn cầu và mở ra những cơ hội tiếp thị đột phá.</p>
          <a href="#vi-tri" className="bg-white text-whatsapp-green font-medium px-6 py-3 rounded-full inline-flex items-center hover:bg-gray-100 transition">
            <span>Khám phá cơ hội</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
