# Koshambari Admin Panel Access Guide

## How to Access the Admin Panel

### Step 1: Navigate to the Admin Login Page
Visit the admin login page at: `/admin/login`

Or simply try to access any admin route (e.g., `/admin`) and you will be automatically redirected to the login page.

### Step 2: Authenticate with Internet Identity
Click the "Login with Internet Identity" button and complete the authentication process through Internet Identity.

### Step 3: Admin Verification
After successful authentication, the system will verify if your account has administrator privileges.

- **If you are an admin**: You will be automatically redirected to the admin dashboard at `/admin`
- **If you are not an admin**: You will see an error message indicating that admin privileges are required

## Admin Panel Routes

Once authenticated as an admin, you can access the following routes:

- `/admin` - Admin Dashboard (overview and quick actions)
- `/admin/products` - Manage Products (add, edit, delete products)
- `/admin/testimonials` - Manage Testimonials (add, edit, delete customer reviews)
- `/admin/contact-info` - Update Contact Information (email, phone, address, business hours)
- `/admin/social-media` - Update Social Media Links (Facebook, Instagram, WhatsApp)
- `/admin/hero-section` - Update Hero Section (headline, description, background image)

## Admin Link in Navigation

When you are logged in as an administrator, an "Admin Panel" link will appear in the main navigation bar between "Contact" and the shopping cart icon. Click this link to quickly access the admin dashboard.

## First-Time Setup

The first user to authenticate with Internet Identity is automatically assigned administrator privileges. Subsequent users will need to be granted admin access by an existing administrator.

## Troubleshooting

### "Access denied" error after login
This means your account does not have administrator privileges. Contact an existing administrator to grant you access.

### Cannot see the Admin Panel link
The Admin Panel link only appears in the navigation when you are authenticated AND have admin privileges. Make sure you are logged in with an admin account.

### Redirected to login when accessing admin routes
This is expected behavior. All admin routes require authentication. Complete the login process to access the admin panel.
