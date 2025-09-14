from app.db.client import connect_db
import asyncio
from app.db.models.book import Book

async def seed_books():
    await connect_db()

    # 50 sample books
    sample_books = [
        {
            "title": "1984",
            "author": "George Orwell",
            "pages": 328,
            "description": "A dystopian novel about a totalitarian regime where truth is manipulated and individual freedom is suppressed through surveillance and control."
        },
        {
            "title": "Pride and Prejudice",
            "author": "Jane Austen",
            "pages": 432,
            "description": "A classic romance following Elizabeth Bennet as she deals with issues of manners, upbringing, morality, education, and marriage in the society of the landed gentry."
        },
        {
            "title": "The Great Gatsby",
            "author": "F. Scott Fitzgerald",
            "pages": 180,
            "description": "A tale of the American Dream gone wrong, featuring the mysterious millionaire Jay Gatsby and his obsession with Daisy Buchanan."
        },
        {
            "title": "To Kill a Mockingbird",
            "author": "Harper Lee",
            "pages": 281,
            "description": "A powerful story about racial injustice and the loss of innocence, told through the eyes of young Scout Finch in the American South."
        },
        {
            "title": "One Hundred Years of Solitude",
            "author": "Gabriel García Márquez",
            "pages": 417,
            "description": "A masterpiece of magical realism following the multi-generational saga of the Buendía family in the mythical town of Macondo."
        },
        {
            "title": "The Catcher in the Rye",
            "author": "J.D. Salinger",
            "pages": 234,
            "description": "The story of teenage alienation and loss of innocence through the eyes of Holden Caulfield during his three-day journey through New York City."
        },
        {
            "title": "The Lord of the Rings",
            "author": "J.R.R. Tolkien",
            "pages": 1178,
            "description": "An epic high-fantasy trilogy following the hobbits' quest to destroy the One Ring and defeat the Dark Lord Sauron."
        },
        {
            "title": "Crime and Punishment",
            "author": "Fyodor Dostoevsky",
            "pages": 671,
            "description": "A psychological thriller about a poor student who commits murder and then deals with the psychological consequences of his actions."
        },
        {
            "title": "The Odyssey",
            "author": "Homer",
            "pages": 541,
            "description": "The ancient Greek epic following Odysseus's ten-year journey home after the Trojan War, facing mythical creatures and divine intervention."
        },
        {
            "title": "Brave New World",
            "author": "Aldous Huxley",
            "pages": 311,
            "description": "A dystopian vision of a future society where technological progress and social stability have replaced individual freedom and human emotions."
        },
        {
            "title": "The Picture of Dorian Gray",
            "author": "Oscar Wilde",
            "pages": 254,
            "description": "A Gothic novel about a beautiful young man who sells his soul to ensure his portrait ages while he remains young."
        },
        {
            "title": "Fahrenheit 451",
            "author": "Ray Bradbury",
            "pages": 249,
            "description": "A dystopian tale of a future American society where books are outlawed and 'firemen' burn any that are found."
        },
        {
            "title": "Jane Eyre",
            "author": "Charlotte Brontë",
            "pages": 532,
            "description": "A Gothic romance following the emotions and experiences of its eponymous heroine, including her growth into adulthood and her love for Mr. Rochester."
        },
        {
            "title": "The Brothers Karamazov",
            "author": "Fyodor Dostoevsky",
            "pages": 824,
            "description": "A philosophical novel that enters deeply into debates about God, free will, and morality through the story of four brothers."
        },
        {
            "title": "Don Quixote",
            "author": "Miguel de Cervantes",
            "pages": 863,
            "description": "The story of an elderly man who, having read too many chivalric romances, loses his sanity and decides to become a knight-errant."
        },
        {
            "title": "The Hobbit",
            "author": "J.R.R. Tolkien",
            "pages": 310,
            "description": "A fantasy novel about Bilbo Baggins, a hobbit who embarks on an unexpected journey with thirteen dwarves to reclaim their mountain home."
        },
        {
            "title": "Wuthering Heights",
            "author": "Emily Brontë",
            "pages": 342,
            "description": "A passionate and dark tale of love and revenge between Heathcliff and Catherine Earnshaw on the Yorkshire moors."
        },
        {
            "title": "The Count of Monte Cristo",
            "author": "Alexandre Dumas",
            "pages": 1276,
            "description": "An adventure story about a man who escapes prison, acquires a fortune, and seeks revenge against those who wrongfully imprisoned him."
        },
        {
            "title": "The Grapes of Wrath",
            "author": "John Steinbeck",
            "pages": 464,
            "description": "The story of the Joad family's journey to California during the Great Depression, seeking work and dignity in desperate times."
        },
        {
            "title": "The Canterbury Tales",
            "author": "Geoffrey Chaucer",
            "pages": 504,
            "description": "A collection of 24 stories that follows pilgrims as they tell tales on their journey to Canterbury Cathedral."
        },
        {
            "title": "Heart of Darkness",
            "author": "Joseph Conrad",
            "pages": 72,
            "description": "A dark journey into the heart of the Congo Free State, exploring imperialism, racism, and the darkness within human nature."
        },
        {
            "title": "The Divine Comedy",
            "author": "Dante Alighieri",
            "pages": 798,
            "description": "An epic poem describing Dante's journey through Hell, Purgatory, and Paradise, guided by Virgil and then Beatrice."
        },
        {
            "title": "The Scarlet Letter",
            "author": "Nathaniel Hawthorne",
            "pages": 238,
            "description": "The story of Hester Prynne, who conceives a daughter through an affair and struggles to create a new life of repentance and dignity."
        },
        {
            "title": "Les Misérables",
            "author": "Victor Hugo",
            "pages": 1463,
            "description": "An epic tale of redemption following ex-convict Jean Valjean's journey through French society, while being pursued by Inspector Javert."
        },
        {
            "title": "The Wind in the Willows",
            "author": "Kenneth Grahame",
            "pages": 256,
            "description": "A classic children's novel following the adventures of four anthropomorphized animals: Mole, Rat, Toad, and Badger."
        },
        {
            "title": "The Prince",
            "author": "Niccolò Machiavelli",
            "pages": 140,
            "description": "A 16th-century political treatise that examines how rulers can maintain their power through strategic thinking and sometimes controversial means."
        },
        {
            "title": "The War of the Worlds",
            "author": "H.G. Wells",
            "pages": 192,
            "description": "One of the earliest stories of alien invasion, describing a Martian attack on Victorian England and humanity's struggle for survival."
        },
        {
            "title": "Frankenstein",
            "author": "Mary Shelley",
            "pages": 280,
            "description": "The story of Victor Frankenstein and his creation, exploring themes of ambition, science, creation, and the responsibility of the creator."
        },
        {
            "title": "The Iliad",
            "author": "Homer",
            "pages": 683,
            "description": "An ancient Greek epic poem set during the Trojan War, focusing on the wrath of Achilles and its consequences."
        },
        {
            "title": "The Adventures of Sherlock Holmes",
            "author": "Arthur Conan Doyle",
            "pages": 307,
            "description": "A collection of twelve detective stories featuring the brilliant consulting detective Sherlock Holmes and his friend Dr. Watson."
        },
        {
            "title": "The Republic",
            "author": "Plato",
            "pages": 416,
            "description": "A philosophical work examining justice, the nature of the just city-state, and the just man through Socratic dialogue."
        },
        {
            "title": "Anna Karenina",
            "author": "Leo Tolstoy",
            "pages": 864,
            "description": "A complex novel following the tragic affair between Anna Karenina and Count Vronsky, set against the backdrop of Russian society."
        },
        {
            "title": "The Time Machine",
            "author": "H.G. Wells",
            "pages": 118,
            "description": "A science fiction novella about an inventor who creates a machine that allows him to travel through time."
        },
        {
            "title": "The Jungle Book",
            "author": "Rudyard Kipling",
            "pages": 277,
            "description": "A collection of stories about Mowgli, a boy raised by wolves in the Indian jungle, and other animal tales."
        },
        {
            "title": "The Three Musketeers",
            "author": "Alexandre Dumas",
            "pages": 625,
            "description": "An adventure novel following d'Artagnan and his three musketeer friends as they defend the queen's honor and fight against cardinal Richelieu."
        },
        {
            "title": "Robinson Crusoe",
            "author": "Daniel Defoe",
            "pages": 304,
            "description": "The story of a castaway who spends 28 years on a remote tropical island, encountering cannibals, captives, and mutineers."
        },
        {
            "title": "Dracula",
            "author": "Bram Stoker",
            "pages": 418,
            "description": "A Gothic horror novel about Count Dracula's attempt to move from Transylvania to England and the battle between him and a group of people led by Van Helsing."
        },
        {
            "title": "The Call of the Wild",
            "author": "Jack London",
            "pages": 172,
            "description": "The story of Buck, a domesticated dog who is stolen and sold as a sled dog in the Yukon Territory during the Klondike Gold Rush."
        },
        {
            "title": "The Portrait of a Lady",
            "author": "Henry James",
            "pages": 592,
            "description": "A novel following the journey of Isabel Archer, a young American woman who affirms her destiny in Europe but falls victim to manipulation."
        },
        {
            "title": "The Color Purple",
            "author": "Alice Walker",
            "pages": 295,
            "description": "A powerful story of African American women in the South, dealing with racism, sexism, and violence while finding their voice and strength."
        },
        {
            "title": "The Invisible Man",
            "author": "H.G. Wells",
            "pages": 192,
            "description": "A science fiction novel about a scientist who discovers how to make himself invisible but slowly descends into madness."
        },
        {
            "title": "The Strange Case of Dr. Jekyll and Mr. Hyde",
            "author": "Robert Louis Stevenson",
            "pages": 141,
            "description": "A Gothic novella about a lawyer investigating his friend Dr. Jekyll and the mysterious Mr. Hyde, exploring the duality of human nature."
        },
        {
            "title": "The Adventures of Tom Sawyer",
            "author": "Mark Twain",
            "pages": 274,
            "description": "The story of a young boy growing up along the Mississippi River, getting into mischief and adventure with his friend Huckleberry Finn."
        },
        {
            "title": "The Red Badge of Courage",
            "author": "Stephen Crane",
            "pages": 168,
            "description": "A war novel about a young private of the Union Army who flees from the field of battle, then returns to fight again and prove his courage."
        },
        {
            "title": "Moby-Dick",
            "author": "Herman Melville",
            "pages": 585,
            "description": "The epic tale of Captain Ahab's obsessive quest for revenge against the great white whale Moby Dick, who destroyed his ship and bit off his leg."
        },
        {
            "title": "The Jungle",
            "author": "Upton Sinclair",
            "pages": 475,
            "description": "A novel exposing the harsh conditions and exploited lives of immigrants in the Chicago meat-packing industry in the early 20th century."
        },
        {
            "title": "The Secret Garden",
            "author": "Frances Hodgson Burnett",
            "pages": 331,
            "description": "A story about a spoiled, orphaned girl who discovers a locked garden and the healing power of nature, friendship, and positive thinking."
        },
        {
            "title": "A Tale of Two Cities",
            "author": "Charles Dickens",
            "pages": 489,
            "description": "Set in London and Paris before and during the French Revolution, this novel follows several characters caught between the social upheaval in both cities."
        },
        {
            "title": "Uncle Tom's Cabin",
            "author": "Harriet Beecher Stowe",
            "pages": 426,
            "description": "An anti-slavery novel that depicts the harsh reality of slavery and had a profound effect on attitudes toward African Americans and slavery in the U.S."
        },
        {
            "title": "Little Women",
            "author": "Louisa May Alcott",
            "pages": 449,
            "description": "The story of four sisters growing up during and after the Civil War, dealing with poverty, love, ambition, and family bonds."
        },
        {
            "title": "The War of the Worlds",
            "author": "H.G. Wells",
            "pages": 192,
            "description": "A groundbreaking science fiction novel depicting a Martian invasion of Earth, exploring themes of imperialism and human survival."
        }
    ]
    
    for book_data in sample_books:
        await Book(**book_data).save()
    
    print("Successfully added 50 books to the database!")

if __name__ == "__main__":
    asyncio.run(seed_books())
