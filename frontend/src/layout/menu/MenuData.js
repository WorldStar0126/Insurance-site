let session_usertype = sessionStorage.getItem("usertype");
const menu = session_usertype == "User" ?
[
  {
    icon: "dashboard",
    text: "Dashboard",
    link: "",
  },
  {
    icon: "home-alt",
    text: "Self Service",
    active: false,
    subMenu: [
      { 
        icon: "reports",
        text: "Policy Management",
        link: "/policyuser",
        subMenu: [
          {
            icon: "reports",
            text: "Select New Policy and Cover",
            link: "/policyuser",
          },
          {
            icon: "reports",
            text: "Add Main Member",
            link: "/policyuser",
          },
          {
            icon: "reports",
            text: "Add Dependent",
            link: "/policyuser",
          },
          {
            icon: "reports",
            text: "Add Beneficiary",
            link: "/policyuser",
          },
          {
            icon: "reports",
            text: "Preview Selected Policy",
            link: "/policyuser",
          },
          {
            icon: "reports",
            text: "Confirm & Signature",
            link: "/policyuser",
          },
        ]
      },
      { 
        icon: "label",
        text: "View My Policies",
        link: "/billing",
      },
      {
        icon: "cart",
        text: "My Cart",
        link: "/billing",
      },
      {
        icon: "user-c",
        text: "Manage Your Profile",
        link: "/user-profile-regular",
      },
      { 
        icon: "contact",
        text: "Manage Your Contact",
        link: "/contact",
      },
      {
        icon: "wallet",
        text: "Manage Your Wallet",
        link: "/contact",
      },
    ],
  },

  {
    icon: "inbox-fill",
    text: "Inbox (pending)",
    link: "/app-chat",
  },
  {
    icon: "bookmark",
    text: "Bookmarks (pending)",
    link: "/a6",
  },
  {
    icon: "setting",
    text: "Settings (pending)",
    link: "/a7",
  },
]
:
[
  {
    icon: "dashboard",
    text: "Dashboard",
    link: "",
  },
  {
    icon: "briefcase",
    text: "Master",
    active: false,
    subMenu: [
      {
        icon: "users",
        text: "Access Management (pending)",
        link: "/a",
      },
      {
        icon: "notes",
        text: "Product Mangement",
        link: "/productmanage",
      },
      {
        icon: "icon ni ni-calendar",
        text: "Policy Management",
        link: "/policymanage",
      },
      {
        icon: "icon ni ni-card-view",
        text: "User Management",
        link: "/usermanage (pending)",
      },
      {
        icon: "money",
        text: "Confirm & Pay",
        link: "/payment",
      },
    ],
  },
  {
    icon: "cc-alt2",
    text: "Summary",
    active: false,
    subMenu: [
          { 
            icon: "users",
            text: "Customers (pending)",
            link: "/a1",
          },
          {
            icon: "notes",
            text: "Members (pending)",
            link: "/a2",
          },
          {
            icon: "home-alt",
            text: "Payments (pending)",
            link: "/a3",
          },
          {
            icon: "bookmark",
            text: "Added Policies",
            link: "/viewpolicies",
          },
    ],
  },
  {
    icon: "home-alt",
    text: "Self Service",
    active: false,
    subMenu: [
      { 
        icon: "money",
        text: "Policy Management",
        link: "/policyuser",
      },
      { 
        icon: "money",
        text: "Billing Options",
        link: "/billing",
      },
      { 
        icon: "money",
        text: "Contact Management",
        link: "/contact",
      },
      {
        icon: "money",
        text: "Confirm & Pay",
        link: "/payment",
      },
    ],
  },
  {
    icon: "inbox-fill",
    text: "Inbox (pending)",
    link: "/app-chat",
  },
  {
    icon: "bookmark",
    text: "Bookmarks (pending)",
    link: "/a6",
  },
  {
    icon: "setting",
    text: "Settings (pending)",
    link: "/a7",
  },
]

export default menu;
