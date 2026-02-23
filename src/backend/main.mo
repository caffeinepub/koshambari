import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the user system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type Category = {
    #sarees;
    #westernDresses;
    #lehenga;
    #jewellery;
  };

  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    imageUrl : Text;
    category : Category;
  };

  type CartItem = {
    product : Product;
    quantity : Nat;
  };

  type Testimonial = {
    id : Nat;
    customerName : Text;
    rating : Nat;
    reviewText : Text;
    date : Text;
  };

  type ContactInfo = {
    emailAddress : Text;
    phoneNumber : Text;
    physicalAddress : Text;
    businessHours : Text;
  };

  type SocialMediaLinks = {
    facebookUrl : Text;
    instagramUrl : Text;
    whatsappUrl : Text;
  };

  type HeroSection = {
    headline : Text;
    description : Text;
    backgroundImageUrl : Text;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
  };

  var nextProductId = 1;
  var nextTestimonialId = 1;

  let products = Map.empty<Nat, Product>();
  let testimonials = Map.empty<Nat, Testimonial>();
  let carts = Map.empty<Principal, [CartItem]>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var contactInfo : ContactInfo = {
    emailAddress = "";
    phoneNumber = "";
    physicalAddress = "";
    businessHours = "";
  };

  var socialMediaLinks : SocialMediaLinks = {
    facebookUrl = "";
    instagramUrl = "";
    whatsappUrl = "";
  };

  var heroSection : HeroSection = {
    headline = "";
    description = "";
    backgroundImageUrl = "";
  };

  // User Role Management
  public shared ({ caller }) func assignAdminRole(user : Principal) : async () {
    AccessControl.assignRole(accessControlState, caller, user, #admin);
  };

  public shared ({ caller }) func revokeAdminRole(user : Principal) : async () {
    AccessControl.assignRole(accessControlState, caller, user, #user);
  };

  public shared ({ caller }) func assignUserRole(user : Principal) : async () {
    AccessControl.assignRole(accessControlState, caller, user, #user);
  };

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Product Management (Admin Only)
  public shared ({ caller }) func addProduct(name : Text, description : Text, price : Nat, imageUrl : Text, category : Category) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };

    let product : Product = {
      id = nextProductId;
      name;
      description;
      price;
      imageUrl;
      category;
    };
    products.add(nextProductId, product);
    nextProductId += 1;
  };

  public shared ({ caller }) func updateProduct(id : Nat, name : Text, description : Text, price : Nat, imageUrl : Text, category : Category) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };

    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?_) { () };
    };

    let updatedProduct : Product = {
      id;
      name;
      description;
      price;
      imageUrl;
      category;
    };
    products.add(id, updatedProduct);
  };

  public shared ({ caller }) func deleteProduct(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };

    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?_) {
        products.remove(id);
      };
    };
  };

  // Public - anyone can view products
  public query func getProducts(category : ?Category) : async [Product] {
    let iter = products.values();
    let filtered = switch (category) {
      case (null) { iter };
      case (?cat) {
        iter.filter(
          func(p) {
            p.category == cat;
          }
        );
      };
    };
    filtered.toArray();
  };

  // Testimonial Management (Admin Only)
  public shared ({ caller }) func addTestimonial(customerName : Text, rating : Nat, reviewText : Text, date : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add testimonials");
    };

    let testimonial : Testimonial = {
      id = nextTestimonialId;
      customerName;
      rating;
      reviewText;
      date;
    };
    testimonials.add(nextTestimonialId, testimonial);
    nextTestimonialId += 1;
  };

  public shared ({ caller }) func updateTestimonial(id : Nat, customerName : Text, rating : Nat, reviewText : Text, date : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update testimonials");
    };

    switch (testimonials.get(id)) {
      case (null) { Runtime.trap("Testimonial not found") };
      case (?_) { () };
    };

    let updatedTestimonial : Testimonial = {
      id;
      customerName;
      rating;
      reviewText;
      date;
    };
    testimonials.add(id, updatedTestimonial);
  };

  public shared ({ caller }) func deleteTestimonial(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete testimonials");
    };

    switch (testimonials.get(id)) {
      case (null) { Runtime.trap("Testimonial not found") };
      case (?_) {
        testimonials.remove(id);
      };
    };
  };

  // Public - anyone can view testimonials
  public query func getTestimonials() : async [Testimonial] {
    testimonials.values().toArray();
  };

  // Contact Info Management (Admin Only)
  public shared ({ caller }) func updateContactInfo(emailAddress : Text, phoneNumber : Text, physicalAddress : Text, businessHours : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update contact info");
    };

    contactInfo := {
      emailAddress;
      phoneNumber;
      physicalAddress;
      businessHours;
    };
  };

  // Public - anyone can view contact info
  public query func getContactInfo() : async ContactInfo {
    contactInfo;
  };

  // Social Media Links Management (Admin Only)
  public shared ({ caller }) func updateSocialMediaLinks(facebookUrl : Text, instagramUrl : Text, whatsappUrl : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update social media links");
    };

    socialMediaLinks := {
      facebookUrl;
      instagramUrl;
      whatsappUrl;
    };
  };

  // Public - anyone can view social media links
  public query func getSocialMediaLinks() : async SocialMediaLinks {
    socialMediaLinks;
  };

  // Hero Section Management (Admin Only)
  public shared ({ caller }) func updateHeroSection(headline : Text, description : Text, backgroundImageUrl : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update hero section");
    };

    heroSection := {
      headline;
      description;
      backgroundImageUrl;
    };
  };

  // Public - anyone can view hero section
  public query func getHeroSection() : async HeroSection {
    heroSection;
  };

  // Cart Management - Users can only manage their own cart
  public shared ({ caller }) func addToCart(productId : Nat, quantity : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add to cart");
    };

    if (quantity == 0) { Runtime.trap("Quantity must be greater than 0") };

    let product = switch (products.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?p) { p };
    };

    let cart = switch (carts.get(caller)) {
      case (null) { [] };
      case (?c) { c };
    };

    let existingIndex = cart.findIndex(
      func(item) {
        item.product.id == productId;
      }
    );

    let newCart = switch (existingIndex) {
      case (null) {
        cart.concat([{ product; quantity }]);
      };
      case (?index) {
        let mutableCart = cart.toVarArray<CartItem>();
        mutableCart[index] := {
          product;
          quantity = mutableCart[index].quantity + quantity;
        };
        Array.fromVarArray(mutableCart);
      };
    };

    carts.add(caller, newCart);
  };

  public query ({ caller }) func getCart() : async [CartItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view cart");
    };

    switch (carts.get(caller)) {
      case (null) { [] };
      case (?cart) { cart };
    };
  };

  public shared ({ caller }) func updateCartItem(productId : Nat, quantity : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update cart");
    };

    if (quantity == 0) { Runtime.trap("Quantity must be greater than 0") };

    let cart = switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart not found") };
      case (?c) { c };
    };

    let newCart = cart.map(
      func(item) {
        if (item.product.id == productId) {
          { product = item.product; quantity };
        } else {
          item;
        };
      }
    );
    carts.add(caller, newCart);
  };

  public shared ({ caller }) func removeCartItem(productId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can remove cart items");
    };

    let cart = switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart not found") };
      case (?c) { c };
    };

    let newCart = cart.filter(
      func(item) {
        item.product.id != productId;
      }
    );
    carts.add(caller, newCart);
  };

  public query ({ caller }) func calculateTotal() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can calculate cart total");
    };

    switch (carts.get(caller)) {
      case (null) { 0 };
      case (?cart) {
        var total = 0;
        for (item in cart.values()) {
          total += item.product.price * item.quantity;
        };
        total;
      };
    };
  };
};
