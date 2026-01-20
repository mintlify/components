
// Code samples for testing
export const getString = (tabIndex?: number, language?: string) => {
    if (language === 'python') {
        return new Array(tabIndex || 1)
            .fill(`print("Hello, World! ${tabIndex && `Here are ${tabIndex} line(s)`}")`)
            .join('\n');
    }

    if (language === 'java') {
        return new Array(tabIndex || 1)
            .fill(`System.out.println("Hello, World! ${tabIndex && `Here are ${tabIndex} line(s)`}");`)
            .join('\n');
    }

    return new Array(tabIndex || 1)
        .fill(`console.log('Hello, World! ${tabIndex && `Here are ${tabIndex} line(s)`}');`)
        .join('\n');
}

export const shortMultiLineCode = `function greet(name) {
  console.log("Hello, " + name + "!");
  return true;
}`;

export const mediumCode = `class HelloWorld {
    private String message;
    
    public HelloWorld(String message) {
        this.message = message;
    }
    
    public void greet() {
        System.out.println("Hello, World!");
        System.out.println(this.message);
    }
    
    public static void main(String[] args) {
        HelloWorld hw = new HelloWorld("Welcome to Java!");
        hw.greet();
    }
}`;

export const longExpandableCode = `from datetime import datetime, timedelta
from typing import Dict, List, Optional
from dataclasses import dataclass

@dataclass
class Book:
    title: str
    author: str
    isbn: str
    checked_out: bool = False
    due_date: Optional[datetime] = None

class Library:
    def __init__(self):
        self.books: Dict[str, Book] = {}
        self.checkouts: Dict[str, List[str]] = {}  # patron -> list of ISBNs

    def add_book(self, book: Book) -> None:
        if book.isbn in self.books:
            raise ValueError(f"Book with ISBN {book.isbn} already exists")
        self.books[book.isbn] = book

    def checkout_book(self, isbn: str, patron: str, days: int = 14) -> None:
        if patron not in self.checkouts:
            self.checkouts[patron] = []

        book = self.books.get(isbn)
        if not book:
            raise ValueError("Book not found")

        if book.checked_out:
            raise ValueError("Book is already checked out")

        if len(self.checkouts[patron]) >= 3:
            raise ValueError("Patron has reached checkout limit")

        book.checked_out = True
        book.due_date = datetime.now() + timedelta(days=days)
        self.checkouts[patron].append(isbn)

    def return_book(self, isbn: str) -> float:
        book = self.books.get(isbn)
        if not book or not book.checked_out:
            raise ValueError("Book not found or not checked out")

        late_fee = 0.0
        if datetime.now() > book.due_date:
            days_late = (datetime.now() - book.due_date).days
            late_fee = days_late * 0.50

        book.checked_out = False
        book.due_date = None

        # Remove from patron's checkouts
        for patron, books in self.checkouts.items():
            if isbn in books:
                books.remove(isbn)
                break

        return late_fee`;

export const longSingleLineCode = `To denote a \`word\` or \`phrase\` as code, enclose it in backticks (\`). The backtick \` is a typographical mark used mainly in computing. It is also known as backquote, grave, or grave accent. This line is intentionally very long to test wrapping behavior and horizontal scrolling.`;
