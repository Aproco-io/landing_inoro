# Zdjęcia autorów

Wrzuć do `src/assets/authors/` plik nazwany slugiem autora — reszta dzieje
się sama, bez zmian w kodzie:

    src/assets/authors/adam-sipowicz.jpg
    src/assets/authors/tomasz-kretek.jpg

Build generuje z niego warianty WebP w rozmiarach 2x/3x, a oryginał zostaje
jako obraz do udostępnień (og:image) i danych strukturalnych.

Slug to ten sam ciąg, który jest w adresie strony autora
(`/pl/wiedza/autor/adam-sipowicz/`).

Wymagania:
  - kwadrat, minimum 200x200 px (awatar we wpisie ma 40 px, na stronie
    autora 112 px — z zapasem na ekrany 2x),
  - .jpg, .png, .webp lub .avif,
  - twarz mniej więcej na środku (kadrowanie to `object-fit: cover`).

Dopóki pliku nie ma, komponenty renderują inicjały w kółku. Nic się nie psuje.
