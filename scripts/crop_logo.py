from PIL import Image

def crop_transparent(image_path, output_path, is_ico=False):
    img = Image.open(image_path).convert("RGBA")
    
    # Get the bounding box of the non-transparent alpha channel
    bbox = img.getbbox()
    
    if bbox:
        # Crop the image to the bounding box
        img = img.crop(bbox)
        
        # If making an icon, it's best to make it square
        width, height = img.size
        size = max(width, height)
        # Create a new transparent image of square size
        new_img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        # Paste the cropped image into the center
        new_img.paste(img, ((size - width) // 2, (size - height) // 2))
        
        if is_ico:
            # Resize for favicon
            new_img = new_img.resize((64, 64), Image.Resampling.LANCZOS)
            new_img.save(output_path, format="ICO", sizes=[(64, 64)])
        else:
            new_img.save(output_path, "PNG")
        print(f"Successfully cropped and saved to {output_path}")
    else:
        print("Image is entirely transparent.")

if __name__ == "__main__":
    base_image = r"c:\feedback-collector\public\logo.png"
    # Overwrite logo.png with cropped version
    crop_transparent(base_image, base_image)
    # Generate correct icon.png
    crop_transparent(base_image, r"c:\feedback-collector\src\app\icon.png")
    # Generate favicon.ico
    crop_transparent(base_image, r"c:\feedback-collector\src\app\favicon.ico", is_ico=True)
    crop_transparent(base_image, r"c:\feedback-collector\public\favicon.ico", is_ico=True)
