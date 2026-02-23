import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";

module {
  // Old Types
  type OldCategory = {
    #sarees;
    #westernDresses;
    #lehenga;
  };

  type OldProduct = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    imageUrl : Text;
    category : OldCategory;
  };

  type OldCartItem = {
    product : OldProduct;
    quantity : Nat;
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

  type Testimonial = {
    id : Nat;
    customerName : Text;
    rating : Nat;
    reviewText : Text;
    date : Text;
  };

  type UserProfile = {
    name : Text;
    email : Text;
  };

  type OldActor = {
    products : Map.Map<Nat, OldProduct>;
    testimonials : Map.Map<Nat, Testimonial>;
    carts : Map.Map<Principal, [OldCartItem]>;
    userProfiles : Map.Map<Principal, UserProfile>;
    contactInfo : ContactInfo;
    socialMediaLinks : SocialMediaLinks;
    heroSection : HeroSection;
    nextProductId : Nat;
    nextTestimonialId : Nat;
  };

  // New Types
  type NewCategory = {
    #sarees;
    #westernDresses;
    #lehenga;
    #jewellery;
  };

  type NewProduct = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    imageUrl : Text;
    category : NewCategory;
  };

  type NewCartItem = {
    product : NewProduct;
    quantity : Nat;
  };

  type NewActor = {
    products : Map.Map<Nat, NewProduct>;
    testimonials : Map.Map<Nat, Testimonial>;
    carts : Map.Map<Principal, [NewCartItem]>;
    userProfiles : Map.Map<Principal, UserProfile>;
    contactInfo : ContactInfo;
    socialMediaLinks : SocialMediaLinks;
    heroSection : HeroSection;
    nextProductId : Nat;
    nextTestimonialId : Nat;
  };

  func mapCategory(oldCategory : OldCategory) : NewCategory {
    switch (oldCategory) {
      case (#sarees) { #sarees };
      case (#westernDresses) { #westernDresses };
      case (#lehenga) { #lehenga };
    };
  };

  func mapProduct(oldProduct : OldProduct) : NewProduct {
    {
      oldProduct with
      category = mapCategory(oldProduct.category);
    };
  };

  func mapCartItem(oldCartItem : OldCartItem) : NewCartItem {
    {
      oldCartItem with
      product = mapProduct(oldCartItem.product);
    };
  };

  public func run(old : OldActor) : NewActor {
    let newProducts = old.products.map<Nat, OldProduct, NewProduct>(
      func(_id, oldProduct) {
        mapProduct(oldProduct);
      }
    );

    let newCarts = old.carts.map<Principal, [OldCartItem], [NewCartItem]>(
      func(_principal, oldCartItems) {
        let iter = oldCartItems.values();
        iter.map(mapCartItem).toArray();
      }
    );

    {
      old with
      products = newProducts;
      carts = newCarts;
    };
  };
};
