import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  
const StatsCard = () => {
    const stats = [
      { id: 1, title: "Total Original URLs", value: 120 },
      { id: 2, title: "Total Shortened URLs", value: 80 },
      { id: 3, title: "Total Clicks", value: 340 },
    ];
    return (
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Statistics</CardTitle>
          <CardDescription>Overview of your URL activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="p-4 border rounded-md bg-white text-center"
              >
                <h2 className="text-lg font-semibold text-zinc-700">
                  {stat.title}
                </h2>
                <p className="text-2xl font-bold ">{stat.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };