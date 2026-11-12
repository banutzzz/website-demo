A&A CLEANING AND DETAILING – SITE STARTER

STRUCTURĂ
- index.html: pagina principală
- servicii.html: servicii
- galerie.html: galerie demonstrativă
- magazin.html: catalog produse
- contact.html: date de contact
- css/style.css: aspectul site-ului
- js/site.js: meniu mobil, Bubble Trail și catalog
- products.json: produsele din magazin
- images/: imagini

PREVIZUALIZARE LOCALĂ
1. Dezarhivează folderul.
2. Deschide terminalul în folder.
3. Rulează: python -m http.server 8000
4. Deschide în browser: http://localhost:8000
Nu deschide direct index.html dacă vrei să testezi catalogul, deoarece products.json este încărcat prin fetch.

ADĂUGARE / MODIFICARE PRODUSE
Editează products.json. Fiecare produs are:
- id: identificator unic
- name: nume produs
- description: descriere
- price: preț în lei (număr)
- icon: simbol temporar
- supplier: furnizor (notă internă, nu este afișată)
- image: cale către imagine (momentan se folosește simbolul)

IMPORTANT DESPRE DROPSHIPPING
Aceasta este o vitrină/catalog cu solicitare de comandă prin WhatsApp. Nu există încă:
- plată online;
- conturi de client sau panou de administrare securizat;
- sincronizare automată cu stocurile furnizorilor;
- transmitere automată a comenzilor către furnizor;
- calcul automat al transportului, facturare sau retururi.
Pentru vânzare online completă sunt necesare ulterior un backend/platformă e-commerce, procesator de plăți, termeni și condiții, politică de confidențialitate, retururi și integrarea furnizorului. Nu publica produsele demo fără să înlocuiești numele, descrierile, prețurile și imaginile și să verifici drepturile de utilizare.

ÎNAINTE DE PUBLICARE
- Înlocuiește imaginile demonstrative din galerie cu fotografii proprii.
- Verifică linkurile Facebook și TikTok și introdu URL-urile exacte ale paginilor firmei.
- Confirmă numărul de telefon, zona și descrierile serviciilor.
- Adaugă logo-ul real în locul monogramei A&A, dacă dorești.
- Configurează domeniul axadetailing.eu în platforma de hosting aleasă.
