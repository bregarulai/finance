"use client";

import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/features/accounts/hooks/useNewAccount";

const Home = () => {
  const { onOpen } = useNewAccount();
  return (
    <div>
      <p>Home Dashboard</p>
      <Button onClick={onOpen}>Add an account</Button>
    </div>
  );
};

export default Home;
