import { ComparisonSlider } from "@/components/comparison-slider";

const features = [
  {
    title: "Add Images Behind Main Image",
    beforeImage: "/personbefore.jpg",
    afterImage: "/personafter.jpg",
    beforeAlt: "Original image without logos",
    afterAlt: "Image with logos added behind",
  },
  {
    title: "Add Text Behind Image",
    beforeImage: "/povbefore.jpg",
    afterImage: "/povafter.jpg",
    beforeAlt: "Original image without text",
    afterAlt: "Image with text added behind",
  },
  {
    title: "Remove & Customize Background",
    beforeImage: "/shirtbefore.jpg",
    afterImage: "/shirtafter.jpg",
    beforeAlt: "Original image with background",
    afterAlt: "Image with customized background",
  },
  {
    title: "Add Logos Behind Image",
    beforeImage: "/socialbefore.jpg",
    afterImage: "/socialafter.jpg",
    beforeAlt: "Original image without logos",
    afterAlt: "Image with logos added behind",
  },
  {
    title: "Clone Objects in Image",
    beforeImage: "/applebefore.jpg",
    afterImage: "/appleafter.jpeg",
    beforeAlt: "Original image without cloning",
    afterAlt: "Image with cloned objects",
  },
  {
    title: "Draw Behind Images in Your Photos",
    beforeImage: "/drawbefore.jpg",
    afterImage: "/drawafter.jpeg",
    beforeAlt: "Original main image",
    afterAlt: "Main image with background drawings",
  },
];

export function FeatureShowcase() {
  return (
    <section className="py-8 px-4" aria-label="Feature examples">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <ComparisonSlider
              key={index}
              beforeImage={feature.beforeImage}
              afterImage={feature.afterImage}
              beforeAlt={feature.beforeAlt}
              afterAlt={feature.afterAlt}
              title={feature.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
