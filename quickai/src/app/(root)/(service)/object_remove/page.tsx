"use client";
import { Button } from "@/components/ui/button";

export default function Profile() {
function handleCLick(){
console.log("hii sir...")
}

  return (
    <div className="text-black">
        <Button variant="destructive" onClick={handleCLick}> random  </Button>
    </div>
  );
}
