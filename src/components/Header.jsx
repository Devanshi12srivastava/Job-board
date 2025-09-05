import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,useUser,
} from "@clerk/clerk-react";
import { BriefcaseBusiness, PenBox } from "lucide-react";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [search,setSearch]=useSearchParams();
   const { user } = useUser();
  useEffect(()=>{
    if(search.get("sign-in")){
      setShowSignIn(true);
    }
  },[search]);

  const handleOverlayClick=(e)=>{
    if(e.target === e.currentTarget){
      setShowSignIn(false)
    }
  }

  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to="/">
          <img src="/logo-dark.png" className="h-10" alt="Logo" />
        </Link>

        <div className="flex gap-8">
          <SignedOut>
            <Button variant="outline" onClick={() => setShowSignIn(true)}>
              Login
            </Button>
          </SignedOut>

          <SignedIn>
            {user?.unsafeMetadata?.role === 'recruiter' &&(
               <Link to="/postjob">
              <Button variant="destructive" className="rounded-full">
                <PenBox size={20} className="mr-2"  />
                Post a Job
              </Button>
            
           </Link>
)}
            <UserButton appearance={{
              elements:{
                avatarBox:"w-10 h-10"
              },
            }}>
              <UserButton.MenuItems>
                <UserButton.Link label="my jobs" labelIcon={<BriefcaseBusiness size={15}/>} href='myjob'/>

                <UserButton.Link label="Saved Job" labelIcon={<BriefcaseBusiness size={15}/>} href='savedjob'/>
                </UserButton.MenuItems> 
              </UserButton>
          </SignedIn>
        </div>
      </nav>

      {showSignIn && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50" onClick={handleOverlayClick}>
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;
