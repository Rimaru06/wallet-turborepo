import { Card } from "@repo/ui/card";

export const P2pTansactions = ({
  transactions,
}: {
  transactions: {
    timestamp: Date;
    amount: number;
    fromUser: number;
    toUser: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }

  return (
    <Card title="Recent Transactions">
      <div className="pt-2">
        {transactions.map((t) => (
          <div className="flex justify-between pt-2 border-b">
            <div>
              <div className="text-sm">
                Sent Rs {t.amount / 100} to {t.toUser}
              </div>
              <div className="text-slate-600 text-xs">
                {t.timestamp.toDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              - Rs {t.amount / 100}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};