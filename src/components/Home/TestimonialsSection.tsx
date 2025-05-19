
const testimonials = [
  {
    quote: "This wrap transformed my parenting experience. The fabric is breathable yet supportive, and the patterns are simply gorgeous.",
    author: "Emily T.",
    location: "New York, NY"
  },
  {
    quote: "As a first-time dad, I was nervous about babywearing. This wrap is so intuitive to use and my daughter falls asleep instantly when I carry her.",
    author: "Michael K.",
    location: "Portland, OR"
  },
  {
    quote: "The quality is unmatched! After trying several brands, this is the only wrap that's comfortable enough for all-day wear.",
    author: "Sarah L.",
    location: "Austin, TX"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-wrap-burgundy font-medium tracking-wider text-sm">TESTIMONIALS</span>
          <h2 className="font-serif text-3xl md:text-4xl mt-2">What Our Customers Say</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-wrap-cream p-8 rounded-xl"
            >
              <div className="mb-4 text-wrap-burgundy">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                </svg>
              </div>
              <p className="text-wrap-charcoal/90 mb-6 italic">{testimonial.quote}</p>
              <div>
                <p className="font-medium">{testimonial.author}</p>
                <p className="text-sm text-wrap-charcoal/60">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
