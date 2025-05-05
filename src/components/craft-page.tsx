"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DownloadCloud, Loader, SparklesIcon } from "lucide-react";
import { StyleProps } from "@/utils/types";
import { ComparisonSlider } from "@/components/comparison-slider";

export default function CraftPage() {
  const [style, setStyle] = useState<StyleProps>("Ghibli Studio");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [transformedImage, setTransformedImage] = useState<File | null>(null);
  const [transformedImagePreview, setTransformedImagePreview] = useState<
    string | null
  >(null);

  const [isTransforming, setIsTransforming] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image || !style) return;

    setTransformedImage(null);
    setTransformedImagePreview(null);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("style", style);

    try {
      setIsTransforming(true);
      const response = await fetch("/api/transform", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();

        const contentDisposition = response.headers.get("Content-Disposition");
        let fileName = "output.png";

        if (contentDisposition) {
          const match = contentDisposition.match(/filename="(.+)"/);
          if (match && match[1]) {
            fileName = match[1];
          }
        }

        const file = new File([blob], fileName, { type: blob.type });

        setTransformedImage(file);
        const url = URL.createObjectURL(file);
        setTransformedImagePreview(url);
      } else {
        console.error("Error transforming image.");
      }
    } catch (err) {
      console.error("Error uploading image:", err);
    } finally {
      setIsTransforming(false);
    }
  };

  const handleDownload = async () => {
    if (!transformedImage || !transformedImagePreview) return;

    const link = document.createElement("a");
    link.href = transformedImagePreview as string;
    link.download = `Imagify ${transformedImage?.name}`;
    link.click();
    link.remove();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <form
        className="flex flex-col items-center justify-center gap-6 w-full"
        onSubmit={handleSubmit}
      >
        <Select
          defaultValue="Ghibli Studio"
          value={style}
          onValueChange={(value) => setStyle(value as StyleProps)}
        >
          <SelectTrigger className="w-full text-base font-medium h-10!">
            <SelectValue placeholder="Select a style" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Style</SelectLabel>
              <SelectItem value="Ghibli Studio">Ghibli Studio</SelectItem>
              <SelectItem value="Renaissance">Renaissance</SelectItem>
              <SelectItem value="Lego">Lego</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Input
          id="picture"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="h-10 file:h-7.25 file:text-base flex justify-center items-center"
        />

        <Button
          className="w-full h-10 text-foreground text-base"
          disabled={!style || !image || isTransforming}
          type="submit"
        >
          {isTransforming ? (
            <>
              <Loader className="animate-spin mr-2" /> Transforming your Image
            </>
          ) : (
            <>
              <SparklesIcon />
              Transform your Image
            </>
          )}
        </Button>
      </form>

      {imagePreview && transformedImagePreview && (
        <>
          <div className="w-90 sm:w-130">
            <ComparisonSlider
              beforeImage={imagePreview as string}
              afterImage={transformedImagePreview as string}
              beforeAlt="Original image"
              afterAlt="Transformed image"
            />
          </div>

          <Button
            className="text-foreground"
            onClick={handleDownload}
            disabled={!transformedImagePreview}
          >
            <DownloadCloud /> Download
          </Button>
        </>
      )}
    </div>
  );
}
