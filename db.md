- user
    - userid (int)
    - username (text)
    - email (text)
    - password (text)
    - phonenumber (text)
    - profilePicture (text)

- hasznaltauto (hirdetések) 
    - id (int)
    - userid (int) (index)
    - title (text)
    - description (medium text)
    - markaid (int)(index) (index)
    - modelid (int)(index) (index)
    - type (text)
    - gastype (text)
    - price (int)
    - year (text)
    - kivitelid (text)(index) (index)
    - kmoroallas (int)

- hasznaltautopics
    - id (int)
    - haszautoid (int)(index) (index)
    - picpath (text)

- markak
    - id (int)
    - marka (text)

- model
    - id (int)
    - markaid (int)(index) (index)
    - model (text)

- kivitel
    - id (int)
    - kivitel (text)
