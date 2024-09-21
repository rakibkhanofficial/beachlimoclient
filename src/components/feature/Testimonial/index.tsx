"use client";
import TestimonialSlider from "./TestimonialSlider";

const Testimonial = () => {
  return (
    <section
      className="section- flex items-center bg-white dark:bg-slate-800"
      id="testimonials"
    >
      <div className="container mx-auto ">
        <TestimonialSlider />
      </div>
    </section>
  );
};

export default Testimonial;
