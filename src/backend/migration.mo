import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";

module {
  // Old types (with goldJewellery)
  type OldCategory = {
    #sarees;
    #westernDresses;
    #goldJewellery;
  };

  type OldProduct = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    imageUrl : Text;
    category : OldCategory;
  };

  // CartItem references Product type, so must be updated
  type OldCartItem = {
    product : OldProduct;
    quantity : Nat;
  };

  // New types (with lehenga)
  type NewCategory = {
    #sarees;
    #westernDresses;
    #lehenga;
  };

  type NewProduct = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    imageUrl : Text;
    category : NewCategory;
  };

  // CartItem references Product type, so must be updated
  type NewCartItem = {
    product : NewProduct;
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

  type UserProfile = {
    name : Text;
    email : Text;
  };

  type Testimonial = {
    id : Nat;
    customerName : Text;
    rating : Nat;
    reviewText : Text;
    date : Text;
  };

  type OldActor = {
    nextProductId : Nat;
    nextTestimonialId : Nat;
    products : Map.Map<Nat, OldProduct>;
    testimonials : Map.Map<Nat, Testimonial>;
    carts : Map.Map<Principal, [OldCartItem]>;
    userProfiles : Map.Map<Principal, UserProfile>;
    contactInfo : ContactInfo;
    socialMediaLinks : SocialMediaLinks;
    heroSection : HeroSection;
  };

  type NewActor = {
    nextProductId : Nat;
    nextTestimonialId : Nat;
    products : Map.Map<Nat, NewProduct>;
    testimonials : Map.Map<Nat, Testimonial>;
    carts : Map.Map<Principal, [NewCartItem]>;
    userProfiles : Map.Map<Principal, UserProfile>;
    contactInfo : ContactInfo;
    socialMediaLinks : SocialMediaLinks;
    heroSection : HeroSection;
  };

  public func run(old : OldActor) : NewActor {
    let newProducts = old.products.map<Nat, OldProduct, NewProduct>(
      func(_id, oldProduct) {
        {
          oldProduct with
          category =
            switch (oldProduct.category) {
              case (#goldJewellery) { #lehenga };
              case (#westernDresses) { #westernDresses };
              case (#sarees) { #sarees };
            };
        };
      }
    );

    let newCarts = old.carts.map<Principal, [OldCartItem], [NewCartItem]>(
      func(_id, oldCartItems) {
        oldCartItems.map<OldCartItem, NewCartItem>(
          func(oldCartItem) {
            {
              oldCartItem with
              product = {
                oldCartItem.product with
                category =
                  switch (oldCartItem.product.category) {
                    case (#goldJewellery) { #lehenga };
                    case (#westernDresses) { #westernDresses };
                    case (#sarees) { #sarees };
                  };
              };
            };
          }
        );
      }
    );
    {
      old with
      products = newProducts;
      carts = newCarts;
    };
  };
};
