import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface MenuItem {
  name: string;
  price: string;
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuData: MenuCategory[] = [
    {
      category: "Espresso Corner",
      items: [
        { name: "Spanish Latte", price: "300 EGP" },
        { name: "Latte", price: "280 EGP" },
        { name: "Cappuccino", price: "280 EGP" },
        { name: "Flat White", price: "260 EGP" },
        { name: "Mocha", price: "300 EGP" },
        { name: "Caramel Mocha", price: "300 EGP" },
        { name: "Caramel Macchiato", price: "300 EGP" },
        { name: "Hot Chocolate", price: "280 EGP" },
        { name: "Espresso (S/D)", price: "180 / 220 EGP" },
        { name: "Espresso Macchiato (S/D)", price: "200 / 220 EGP" },
        { name: "Americano (M/L)", price: "180 / 220 EGP" }
      ]
    },
    {
      category: "Hot Corner",
      items: [
        { name: "Tea (M/L)", price: "120 / 140 EGP" },
        { name: "Tea With Milk (M/L)", price: "180 / 180 EGP" },
        { name: "Flavored Tea (M/L)", price: "120 / 160 EGP" },
        { name: "Herbs Mix (M/L)", price: "160 / 180 EGP" },
        { name: "Anise (M/L)", price: "120 / 140 EGP" },
        { name: "Mint (M/L)", price: "120 / 140 EGP" },
        { name: "Roselle (M/L)", price: "100 / 140 EGP" },
        { name: "Cinnamon With Milk (M/L)", price: "140 / 180 EGP" },
        { name: "Sahlab", price: "180 EGP" },
        { name: "Sahlab Nuts", price: "220 EGP" },
        { name: "Sahlab Oreo", price: "220 EGP" },
        { name: "Sahlab Fruits", price: "220 EGP" },
        { name: "Karak Tea", price: "200 EGP" },
        { name: "Hot Cider", price: "240 EGP" }
      ]
    },
    {
      category: "Coffee Corner",
      items: [
        { name: "Turkish Coffee (S/D)", price: "160 / 240 EGP" },
        { name: "French Coffee (S/D)", price: "180 / 280 EGP" },
        { name: "Hazelnut Coffee (S/D)", price: "180 / 280 EGP" },
        { name: "Nutella Coffee (S/D)", price: "220 / 280 EGP" },
        { name: "Chocolate Coffee (S/D)", price: "200 / 240 EGP" }
      ]
    },
    {
      category: "Iced Corner",
      items: [
        { name: "Ice Spanish Latte", price: "340 EGP" },
        { name: "Ice Latte", price: "280 EGP" },
        { name: "Ice Mocha", price: "280 EGP" },
        { name: "Ice Caramel Macchiato", price: "280 EGP" },
        { name: "Ice Chocolate", price: "280 EGP" }
      ]
    },
    {
      category: "Frappe Corner",
      items: [
        { name: "Mocha Frappe", price: "300 EGP" },
        { name: "Vanilla Frappe", price: "300 EGP" },
        { name: "Oreo Frappe", price: "300 EGP" },
        { name: "Vanilla Cream Frappe", price: "300 EGP" },
        { name: "Caramel Cream Frappe", price: "300 EGP" },
        { name: "Chocolate Cream Frappe", price: "300 EGP" },
        { name: "Coffee Frappe", price: "300 EGP" },
        { name: "Caramel Frappe", price: "300 EGP" },
        { name: "Mango Cream Frappe", price: "240 EGP" },
        { name: "Strawberry Cream Frappe", price: "240 EGP" }
      ]
    },
    {
      category: "Yogurt Corner",
      items: [
        { name: "Mango Yogurt", price: "240 EGP" },
        { name: "Strawberry Yogurt", price: "240 EGP" },
        { name: "Blueberry Yogurt", price: "240 EGP" },
        { name: "Peach Yogurt", price: "240 EGP" },
        { name: "Kiwi Yogurt", price: "240 EGP" },
        { name: "Passion Fruit Yogurt", price: "240 EGP" },
        { name: "Yogurt Honey", price: "240 EGP" },
        { name: "Yogurt Plain", price: "200 EGP" }
      ]
    },
    {
      category: "Smoothies Corner",
      items: [
        { name: "Mango Smoothie", price: "200 EGP" },
        { name: "Strawberry Smoothie", price: "200 EGP" },
        { name: "Blueberry Smoothie", price: "200 EGP" },
        { name: "Peach Smoothie", price: "200 EGP" },
        { name: "Pineapple Smoothie", price: "200 EGP" },
        { name: "Passionfruit Smoothie", price: "200 EGP" },
        { name: "Kiwi Smoothie", price: "200 EGP" }
      ]
    },
    {
      category: "Soda Corner",
      items: [
        { name: "V.Cola", price: "140 EGP" },
        { name: "V.7 Flavors", price: "140 EGP" },
        { name: "Maxi", price: "100 EGP" },
        { name: "Twist", price: "160 EGP" },
        { name: "Energy Espresso", price: "320 EGP" },
        { name: "Cherry Cola", price: "200 EGP" },
        { name: "Mojito", price: "200 EGP" },
        { name: "Sun Shine", price: "200 EGP" },
        { name: "Jelly Cola", price: "200 EGP" },
        { name: "Water", price: "60 EGP" },
        { name: "Ice Cup", price: "20 EGP" },
        { name: "Red Bull", price: "260 EGP" },
        { name: "Monster", price: "200 EGP" },
        { name: "Hot Cup for Indomie", price: "40 EGP" }
      ]
    },
    {
      category: "Juice Corner",
      items: [
        { name: "Mango", price: "220 EGP" },
        { name: "Strawberry", price: "200 EGP" },
        { name: "Guava", price: "200 EGP" },
        { name: "Orange", price: "200 EGP" },
        { name: "Tangerine", price: "200 EGP" },
        { name: "Banana with Milk", price: "200 EGP" },
        { name: "Strawberry with Milk", price: "200 EGP" },
        { name: "Guava with Milk", price: "200 EGP" },
        { name: "Lemon Mint", price: "200 EGP" }
      ]
    },
    {
      category: "Extras",
      items: [
        { name: "Extra Flavor", price: "60 EGP" },
        { name: "Extra Milk", price: "60 EGP" },
        { name: "Extra Espresso", price: "100 EGP" },
        { name: "Extra Sauce", price: "60 EGP" },
        { name: "Birthday Person", price: "200 EGP" },
        { name: "Pick (S/L)", price: "20 / 40 EGP" },
        { name: "Rollana", price: "40 EGP" }
      ]
    }
  ];

  constructor() { }

  getMenu(): Observable<MenuCategory[]> {
    return of(this.menuData);
  }

  submitContact(data: { name: string; email: string; message: string }): Observable<any> {
    return of({
      success: true,
      message: 'Thank you for reaching out! Your message has been received by THE FACE team.'
    });
  }
}


