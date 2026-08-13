import { Component, OnInit, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { MenuService, MenuCategory } from '../../services/menu';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, AfterViewInit {
  menuCategories: MenuCategory[] = [];
  selectedCategory: string = 'All';

  // Timer Challenge Game State
  isTimerModalOpen: boolean = false;
  timerMs: number = 0;
  isTimerRunning: boolean = false;
  timerInterval: any = null;
  timerMessage: string = '';
  timerWin: boolean = false;

  // Contact Form State
  contactData = {
    name: '',
    email: '',
    message: ''
  };
  isSubmittingContact: boolean = false;
  contactSuccessMessage: string = '';
  contactErrorMessage: string = '';

  constructor(
    private menuService: MenuService,
    private el: ElementRef,
    private location: Location,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.menuService.getMenu().subscribe({
      next: (data) => {
        this.menuCategories = data;
        this.cdr.detectChanges();
        setTimeout(() => this.setupObserver(), 100);
      },
      error: (err) => {
        console.error('Error fetching menu', err);
      }
    });
  }

  ngAfterViewInit(): void {
    this.setupObserver();
  }

  // Dynamic Categories List for Filter Chips
  get categoryNames(): string[] {
    const list = ['All'];
    this.menuCategories.forEach(c => {
      if (!list.includes(c.category)) {
        list.push(c.category);
      }
    });
    return list;
  }

  getCategoryIcon(cat: string): string {
    const c = cat.toLowerCase();
    if (c === 'all') return 'fa-solid fa-list-check';
    if (c.includes('espresso')) return 'fa-solid fa-mug-saucer';
    if (c.includes('coffee')) return 'fa-solid fa-mug-hot';
    if (c.includes('hot')) return 'fa-solid fa-fire-burner';
    if (c.includes('iced')) return 'fa-solid fa-snowflake';
    if (c.includes('frappe')) return 'fa-solid fa-glass-water';
    if (c.includes('smoothie')) return 'fa-solid fa-blender';
    if (c.includes('yogurt')) return 'fa-solid fa-bowl-food';
    if (c.includes('soda')) return 'fa-solid fa-bottle-water';
    if (c.includes('juice')) return 'fa-solid fa-wine-glass';
    return 'fa-solid fa-star';
  }

  // Category Filtering
  setCategory(cat: string): void {
    this.selectedCategory = cat;
    this.cdr.detectChanges();
  }

  get displayedCategories(): MenuCategory[] {
    if (this.selectedCategory === 'All') {
      return this.menuCategories;
    }
    return this.menuCategories.filter(c => c.category === this.selectedCategory || c.category.toLowerCase().includes(this.selectedCategory.toLowerCase()));
  }

  // Timer Challenge Game Methods
  openTimerModal(): void {
    this.isTimerModalOpen = true;
    this.resetTimer();
    this.cdr.detectChanges();
  }

  closeTimerModal(): void {
    this.isTimerModalOpen = false;
    this.stopTimer();
    this.cdr.detectChanges();
  }

  toggleTimer(): void {
    if (this.isTimerRunning) {
      this.stopTimer();
      const seconds = this.timerMs / 1000;
      if (seconds >= 4.95 && seconds <= 5.05) {
        this.timerWin = true;
        this.timerMessage = '🎉 CONGRATULATIONS! You hit the target! Show this screen to our Barista for a FREE COFFEE!';
      } else {
        this.timerWin = false;
        this.timerMessage = `You stopped at ${seconds.toFixed(2)}s. Target is exactly 05.00s. Try again!`;
      }
      this.cdr.detectChanges();
    } else {
      this.startTimer();
    }
  }

  startTimer(): void {
    this.stopTimer();
    this.timerMs = 0;
    this.isTimerRunning = true;
    this.timerMessage = '';
    this.timerWin = false;
    const startTime = Date.now();

    this.timerInterval = setInterval(() => {
      this.timerMs = Date.now() - startTime;
      this.cdr.detectChanges(); // Trigger live UI update on every tick!

      if (this.timerMs >= 10000) { // Auto-stop after 10s
        this.stopTimer();
        this.timerMessage = 'Time limit reached! Tap "Start" to try again.';
        this.cdr.detectChanges();
      }
    }, 10);
  }

  stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.isTimerRunning = false;
    this.cdr.detectChanges();
  }

  resetTimer(): void {
    this.stopTimer();
    this.timerMs = 0;
    this.timerMessage = '';
    this.timerWin = false;
    this.cdr.detectChanges();
  }


  // Contact Form Submission
  submitContactForm(): void {
    if (!this.contactData.name || !this.contactData.email || !this.contactData.message) {
      this.contactErrorMessage = 'Please fill in all fields before sending.';
      this.contactSuccessMessage = '';
      return;
    }

    this.isSubmittingContact = true;
    this.contactErrorMessage = '';
    this.contactSuccessMessage = '';

    this.menuService.submitContact(this.contactData).subscribe({
      next: (res) => {
        this.isSubmittingContact = false;
        this.contactSuccessMessage = res.message || 'Message sent successfully!';
        this.contactData = { name: '', email: '', message: '' };
      },
      error: (err) => {
        this.isSubmittingContact = false;
        this.contactErrorMessage = 'Failed to send message. Please try again.';
        console.error('Contact submission error', err);
      }
    });
  }

  scrollToSection(id: string): void {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  setupObserver(): void {
    const animOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const animObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, animOptions);

    const elements = this.el.nativeElement.querySelectorAll('.fade-in-up');
    elements.forEach((el: Element) => animObserver.observe(el));

    const spyOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) {
            this.location.replaceState('/' + id);
          }
        }
      });
    }, spyOptions);

    const sections = this.el.nativeElement.querySelectorAll('section[id]');
    sections.forEach((sec: Element) => spyObserver.observe(sec));
  }
}

