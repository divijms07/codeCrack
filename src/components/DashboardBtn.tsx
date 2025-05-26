/*"use client" 
import Link from "next/link";
import { Button } from "@/components/ui/button" 
import { SparklesIcon } from "lucide-react";
function DashboardBtn(){

  return (
    <Link href="/dashboard">
      <Button className="gap-2 font-medium" size="sm">
        <SparklesIcon className="size-4" />
        Dashboard
      </Button>
    </Link>
  );
}

export default DashboardBtn;*/

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SparklesIcon } from "lucide-react";
import { useUserRole } from "@/hooks/useUserRole"; 

function DashboardBtn() {
  const { isInterviewer, isLoading } = useUserRole();

  if (isLoading || !isInterviewer) return null;

  return (
    <Link href="/dashboard">
      <Button className="gap-2 font-medium" size="sm">
        <SparklesIcon className="size-4" />
        Dashboard
      </Button>
    </Link>
  );
}

export default DashboardBtn;


































/*"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { SparklesIcon } from "lucide-react";

function DashboardBtn() {
  const { user } = useUser();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const userData = useQuery(
    api.users.getUserByClerkId,
    isClient && user?.id ? { clerkId: user.id } : "skip"
  );

  const isLoading = !isClient || userData === undefined;
  const isInterviewer = userData?.role === "interviewer";

  if (isLoading || !isInterviewer) return null;

  return (
    <Link href="/dashboard">
      <Button className="gap-2 font-medium" size="sm">
        <SparklesIcon className="size-4" />
        Dashboard
      </Button>
    </Link>
  );
}

export default DashboardBtn;*/
