import { Metadata } from "next";
import { Calendar, Clock, FileText, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Meetings",
  description:
    "View agendas, minutes, and decisions from HOA Board and community meetings.",
};

const upcomingMeetings = [
  {
    id: "1",
    title: "Board Meeting",
    type: "board",
    date: "January 2026",
    time: "6:00 PM",
    location: "Community Room",
    status: "scheduled",
  },
];

const pastMeetings = [
  {
    id: "2",
    title: "Annual Meeting",
    type: "annual",
    date: "November 2025",
    summary: "Annual budget approval, board elections, and governance policy adoption.",
    hasMinutes: true,
  },
  {
    id: "3",
    title: "Board Meeting",
    type: "board",
    date: "October 2025",
    summary: "Insurance renewal review and collections policy updates.",
    hasMinutes: true,
  },
];

export default function MeetingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Meetings & Decisions</h1>
        <p className="text-muted-foreground">
          View upcoming meetings, past meeting minutes, and board decisions.
        </p>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Meetings</TabsTrigger>
          <TabsTrigger value="decisions">Decisions</TabsTrigger>
        </TabsList>

        {/* Upcoming Meetings */}
        <TabsContent value="upcoming" className="space-y-4">
          {upcomingMeetings.length > 0 ? (
            upcomingMeetings.map((meeting) => (
              <Card key={meeting.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">
                          {meeting.type === "board" ? "Board Meeting" : "Annual Meeting"}
                        </Badge>
                        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Scheduled
                        </Badge>
                      </div>
                      <CardTitle>{meeting.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{meeting.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{meeting.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{meeting.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-dashed">
              <CardContent className="py-8 text-center">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No upcoming meetings scheduled.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Past Meetings */}
        <TabsContent value="past" className="space-y-4">
          {pastMeetings.map((meeting) => (
            <Card key={meeting.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">
                        {meeting.type === "board" ? "Board Meeting" : "Annual Meeting"}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {meeting.date}
                      </span>
                    </div>
                    <CardTitle>{meeting.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {meeting.summary}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              {meeting.hasMinutes && (
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>Minutes available (coming soon)</span>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </TabsContent>

        {/* Decisions */}
        <TabsContent value="decisions">
          <Card className="border-dashed">
            <CardContent className="py-8 text-center">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-2">Decision Log Coming Soon</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We&apos;re working on a searchable log of all board decisions with
                links to related meeting minutes.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
