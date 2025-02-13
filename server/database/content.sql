-- Création de la table content si elle n'existe pas
CREATE TABLE IF NOT EXISTS content (
    id INT AUTO_INCREMENT PRIMARY KEY,
    section VARCHAR(50) NOT NULL UNIQUE,
    content TEXT NOT NULL,
    last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertion du contenu initial pour la section "parcours" s'il n'existe pas
INSERT IGNORE INTO content (section, content) VALUES (
    'parcours',
    'Découvrez mon parcours dans le développement web et ma passion pour la création d''interfaces innovantes. Je suis constamment en quête d''apprentissage et d''amélioration, cherchant à repousser les limites de ce qui est possible dans le développement web.'
);
