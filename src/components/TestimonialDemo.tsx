"use client";
import { TestimonialSlider } from "./ui/testimonal-slider";
import { testimonials } from '../data/constants';

const ComponentDemo = () => {
  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-lg border-white/5 bg-black/40 flex flex-col justify-center">
      <div className="mt-[64px] flex justify-center px-12">
        <TestimonialSlider testimonials={testimonials} />
      </div>
    </div>
  );
};

export default ComponentDemo;
