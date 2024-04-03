import React from 'react'
import { SendCard } from '../../../components/SendCard'
import prisma from '@repo/db/client'
import { authOptions } from '../../lib/auth'
import { getServerSession } from 'next-auth'
import { P2pTansactions } from '../../../components/p2pTansactions'

async function getp2pTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.p2pTransfer.findMany({
    where : {
      fromUserId : Number(session?.user?.id)
    },
    select : {
      timestamp : true,
      amount : true,
      toUserId : true,
      fromUserId : true,
      toUser : {
        select : {
          name : true,
          number : true
        }
      }
    }
  });
  return txns.map((t : any) => {
    return {
      timestamp: t.timestamp,
      amount: t.amount,
      toUser: t.toUser.number,
      fromUser: t.fromUserId,
    };
  })
}

const page = async () => {
  const transactions = await getp2pTransactions();
  return (
    <div className="w-full grid grid-cols-2 gap-5 items-center  ">
      <div>
        <SendCard />
      </div>
      <div className='flex items-center justify-center  '>
        <P2pTansactions transactions={transactions} />
      </div>
    </div>
  );
}

export default page