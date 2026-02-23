import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Testimonial {
    id: bigint;
    customerName: string;
    date: string;
    reviewText: string;
    rating: bigint;
}
export interface SocialMediaLinks {
    whatsappUrl: string;
    instagramUrl: string;
    facebookUrl: string;
}
export interface CartItem {
    quantity: bigint;
    product: Product;
}
export interface HeroSection {
    backgroundImageUrl: string;
    headline: string;
    description: string;
}
export interface ContactInfo {
    businessHours: string;
    physicalAddress: string;
    emailAddress: string;
    phoneNumber: string;
}
export interface Product {
    id: bigint;
    name: string;
    description: string;
    imageUrl: string;
    category: Category;
    price: bigint;
}
export interface UserProfile {
    name: string;
    email: string;
}
export enum Category {
    lehenga = "lehenga",
    jewellery = "jewellery",
    sarees = "sarees",
    westernDresses = "westernDresses"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(name: string, description: string, price: bigint, imageUrl: string, category: Category): Promise<void>;
    addTestimonial(customerName: string, rating: bigint, reviewText: string, date: string): Promise<void>;
    addToCart(productId: bigint, quantity: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    calculateTotal(): Promise<bigint>;
    deleteProduct(id: bigint): Promise<void>;
    deleteTestimonial(id: bigint): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCart(): Promise<Array<CartItem>>;
    getContactInfo(): Promise<ContactInfo>;
    getHeroSection(): Promise<HeroSection>;
    getProducts(category: Category | null): Promise<Array<Product>>;
    getSocialMediaLinks(): Promise<SocialMediaLinks>;
    getTestimonials(): Promise<Array<Testimonial>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    removeCartItem(productId: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateCartItem(productId: bigint, quantity: bigint): Promise<void>;
    updateContactInfo(emailAddress: string, phoneNumber: string, physicalAddress: string, businessHours: string): Promise<void>;
    updateHeroSection(headline: string, description: string, backgroundImageUrl: string): Promise<void>;
    updateProduct(id: bigint, name: string, description: string, price: bigint, imageUrl: string, category: Category): Promise<void>;
    updateSocialMediaLinks(facebookUrl: string, instagramUrl: string, whatsappUrl: string): Promise<void>;
    updateTestimonial(id: bigint, customerName: string, rating: bigint, reviewText: string, date: string): Promise<void>;
}
