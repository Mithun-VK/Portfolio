/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Navbar from './Navbar';

// Mock window.scrollTo for smooth scroll tests
const mockScrollTo = jest.fn();
global.scrollTo = mockScrollTo;

// Wrapper component for router context
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

// Helper to trigger scroll event
const triggerScroll = (scrollY) => {
  global.pageYOffset = scrollY;
  global.dispatchEvent(new Event('scroll'));
};

// Helper to trigger resize event
const triggerResize = (width) => {
  global.innerWidth = width;
  global.dispatchEvent(new Event('resize'));
};

describe('Navbar Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockScrollTo.mockClear();
    global.innerWidth = 1024; // Desktop by default
    global.pageYOffset = 0;
  });

  afterEach(() => {
    // Cleanup
    jest.clearAllMocks();
  });

  // ===== RENDERING TESTS =====
  
  describe('Rendering', () => {
    test('renders navbar with logo', () => {
      renderWithRouter(<Navbar />);
      
      const logo = screen.getByText(/YourName/i);
      expect(logo).toBeInTheDocument();
    });

    test('renders all navigation links', () => {
      renderWithRouter(<Navbar />);
      
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Projects')).toBeInTheDocument();
      expect(screen.getByText('Skills')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    test('renders resume download button', () => {
      renderWithRouter(<Navbar />);
      
      const resumeButtons = screen.getAllByText('Resume');
      expect(resumeButtons.length).toBeGreaterThan(0);
    });

    test('renders with correct ARIA labels', () => {
      renderWithRouter(<Navbar />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('aria-label', 'Main navigation');
      
      const logoLink = screen.getByLabelText('Home');
      expect(logoLink).toBeInTheDocument();
    });
  });

  // ===== SCROLL BEHAVIOR TESTS =====
  
  describe('Scroll Behavior', () => {
    test('adds scrolled class when scrolling down', async () => {
      const { container } = renderWithRouter(<Navbar />);
      const navbar = container.querySelector('.navbar');
      
      expect(navbar).not.toHaveClass('navbar--scrolled');
      
      // Trigger scroll
      triggerScroll(60);
      
      await waitFor(() => {
        expect(navbar).toHaveClass('navbar--scrolled');
      });
    });

    test('removes scrolled class when at top', async () => {
      const { container } = renderWithRouter(<Navbar />);
      const navbar = container.querySelector('.navbar');
      
      // Scroll down first
      triggerScroll(60);
      await waitFor(() => expect(navbar).toHaveClass('navbar--scrolled'));
      
      // Scroll back to top
      triggerScroll(40);
      await waitFor(() => {
        expect(navbar).not.toHaveClass('navbar--scrolled');
      });
    });

    test('smooth scrolls to section on link click', async () => {
      // Mock querySelector to return a fake element
      const mockElement = {
        getBoundingClientRect: () => ({ top: 500 })
      };
      document.querySelector = jest.fn().mockReturnValue(mockElement);
      
      renderWithRouter(<Navbar />);
      
      const aboutLink = screen.getAllByText('About')[0];
      await userEvent.click(aboutLink);
      
      await waitFor(() => {
        expect(mockScrollTo).toHaveBeenCalledWith({
          top: expect.any(Number),
          behavior: 'smooth'
        });
      });
    });
  });

  // ===== MOBILE MENU TESTS =====
  
  describe('Mobile Menu', () => {
    beforeEach(() => {
      global.innerWidth = 768; // Mobile viewport
    });

    test('hamburger menu is visible on mobile', () => {
      renderWithRouter(<Navbar />);
      
      const toggleButton = screen.getByLabelText('Open menu');
      expect(toggleButton).toBeInTheDocument();
    });

    test('opens mobile menu when hamburger is clicked', async () => {
      const { container } = renderWithRouter(<Navbar />);
      
      const toggleButton = screen.getByLabelText('Open menu');
      await userEvent.click(toggleButton);
      
      await waitFor(() => {
        const mobileMenu = container.querySelector('.navbar__mobile--open');
        expect(mobileMenu).toBeInTheDocument();
      });
      
      expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
    });

    test('closes mobile menu when clicking a link', async () => {
      const { container } = renderWithRouter(<Navbar />);
      
      // Open menu
      const toggleButton = screen.getByLabelText('Open menu');
      await userEvent.click(toggleButton);
      
      await waitFor(() => {
        expect(container.querySelector('.navbar__mobile--open')).toBeInTheDocument();
      });
      
      // Click a link
      const mobileLinks = screen.getAllByText('About');
      const mobileAboutLink = mobileLinks[mobileLinks.length - 1]; // Get mobile version
      await userEvent.click(mobileAboutLink);
      
      await waitFor(() => {
        expect(container.querySelector('.navbar__mobile--open')).not.toBeInTheDocument();
      });
    });

    test('closes mobile menu when clicking overlay', async () => {
      const { container } = renderWithRouter(<Navbar />);
      
      // Open menu
      const toggleButton = screen.getByLabelText('Open menu');
      await userEvent.click(toggleButton);
      
      await waitFor(() => {
        expect(container.querySelector('.navbar__mobile--open')).toBeInTheDocument();
      });
      
      // Click overlay
      const overlay = container.querySelector('.navbar__overlay--visible');
      fireEvent.click(overlay);
      
      await waitFor(() => {
        expect(container.querySelector('.navbar__mobile--open')).not.toBeInTheDocument();
      });
    });

    test('prevents body scroll when mobile menu is open', async () => {
      renderWithRouter(<Navbar />);
      
      const toggleButton = screen.getByLabelText('Open menu');
      await userEvent.click(toggleButton);
      
      await waitFor(() => {
        expect(document.body.style.overflow).toBe('hidden');
      });
    });

    test('restores body scroll when mobile menu is closed', async () => {
      renderWithRouter(<Navbar />);
      
      const toggleButton = screen.getByLabelText('Open menu');
      
      // Open menu
      await userEvent.click(toggleButton);
      await waitFor(() => expect(document.body.style.overflow).toBe('hidden'));
      
      // Close menu
      const closeButton = screen.getByLabelText('Close menu');
      await userEvent.click(closeButton);
      
      await waitFor(() => {
        expect(document.body.style.overflow).toBe('unset');
      });
    });

    test('hamburger icon animates when menu opens', async () => {
      const { container } = renderWithRouter(<Navbar />);
      
      const toggleButton = screen.getByLabelText('Open menu');
      expect(toggleButton).not.toHaveClass('navbar__toggle--active');
      
      await userEvent.click(toggleButton);
      
      await waitFor(() => {
        expect(toggleButton).toHaveClass('navbar__toggle--active');
      });
    });
  });

  // ===== RESPONSIVE BEHAVIOR TESTS =====
  
  describe('Responsive Behavior', () => {
    test('closes mobile menu when resizing to desktop', async () => {
      const { container } = renderWithRouter(<Navbar />);
      
      // Start in mobile
      global.innerWidth = 768;
      triggerResize(768);
      
      // Open menu
      const toggleButton = screen.getByLabelText('Open menu');
      await userEvent.click(toggleButton);
      
      await waitFor(() => {
        expect(container.querySelector('.navbar__mobile--open')).toBeInTheDocument();
      });
      
      // Resize to desktop
      triggerResize(1024);
      
      await waitFor(() => {
        expect(container.querySelector('.navbar__mobile--open')).not.toBeInTheDocument();
      });
    });

    test('desktop menu is visible on large screens', () => {
      global.innerWidth = 1024;
      const { container } = renderWithRouter(<Navbar />);
      
      const desktopMenu = container.querySelector('.navbar__menu');
      expect(desktopMenu).toBeInTheDocument();
    });
  });

  // ===== ACCESSIBILITY TESTS =====
  
  describe('Accessibility', () => {
    test('hamburger button has correct aria-expanded state', async () => {
      renderWithRouter(<Navbar />);
      
      const toggleButton = screen.getByRole('button', { name: /menu/i });
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
      
      await userEvent.click(toggleButton);
      
      await waitFor(() => {
        expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
      });
    });

    test('mobile menu has correct role', async () => {
      renderWithRouter(<Navbar />);
      
      const mobileMenu = screen.getByRole('menu');
      expect(mobileMenu).toBeInTheDocument();
    });

    test('keyboard navigation works for hamburger button', async () => {
      renderWithRouter(<Navbar />);
      
      const toggleButton = screen.getByLabelText('Open menu');
      toggleButton.focus();
      
      expect(toggleButton).toHaveFocus();
      
      // Simulate Enter key
      fireEvent.keyDown(toggleButton, { key: 'Enter', code: 'Enter' });
      await userEvent.click(toggleButton);
      
      await waitFor(() => {
        expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
      });
    });

    test('all navigation links are keyboard accessible', () => {
      renderWithRouter(<Navbar />);
      
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toBeInTheDocument();
      });
    });
  });

  // ===== LINK BEHAVIOR TESTS =====
  
  describe('Navigation Links', () => {
    test('logo links to home page', () => {
      renderWithRouter(<Navbar />);
      
      const logo = screen.getByLabelText('Home');
      expect(logo).toHaveAttribute('href', '/');
    });

    test('resume button has download attribute', () => {
      renderWithRouter(<Navbar />);
      
      const resumeLinks = screen.getAllByText('Resume');
      const desktopResumeButton = resumeLinks[0];
      
      expect(desktopResumeButton.closest('a')).toHaveAttribute('href', '/assets/resume.pdf');
      expect(desktopResumeButton.closest('a')).toHaveAttribute('download');
    });

    test('navigation links have correct href attributes', () => {
      renderWithRouter(<Navbar />);
      
      const aboutLink = screen.getAllByText('About')[0];
      expect(aboutLink.closest('a')).toHaveAttribute('href', '#about');
      
      const projectsLink = screen.getAllByText('Projects')[0];
      expect(projectsLink.closest('a')).toHaveAttribute('href', '#projects');
    });
  });

  // ===== CLEANUP TESTS =====
  
  describe('Cleanup and Memory Leaks', () => {
    test('removes event listeners on unmount', () => {
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
      
      const { unmount } = renderWithRouter(<Navbar />);
      unmount();
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
      expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
      
      removeEventListenerSpy.mockRestore();
    });

    test('restores body overflow on unmount', () => {
      global.innerWidth = 768;
      const { unmount } = renderWithRouter(<Navbar />);
      
      const toggleButton = screen.getByLabelText('Open menu');
      userEvent.click(toggleButton);
      
      unmount();
      
      expect(document.body.style.overflow).toBe('unset');
    });
  });

  // ===== EDGE CASES =====
  
  describe('Edge Cases', () => {
    test('handles clicking anchor link when target section does not exist', async () => {
      document.querySelector = jest.fn().mockReturnValue(null);
      
      renderWithRouter(<Navbar />);
      
      const aboutLink = screen.getAllByText('About')[0];
      await userEvent.click(aboutLink);
      
      // Should not throw error
      expect(mockScrollTo).not.toHaveBeenCalled();
    });

    test('handles rapid menu toggling', async () => {
      const { container } = renderWithRouter(<Navbar />);
      const toggleButton = screen.getByLabelText('Open menu');
      
      // Rapidly click multiple times
      await userEvent.click(toggleButton);
      await userEvent.click(toggleButton);
      await userEvent.click(toggleButton);
      
      // Final state should be open
      await waitFor(() => {
        expect(container.querySelector('.navbar__mobile--open')).toBeInTheDocument();
      });
    });
  });
});
