import { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, FileText, Users, MapPin, ChevronRight, Vote, CheckCircle2, XCircle, MinusCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUpcomingMeetings, getPastMeetings } from "@/lib/data/meetings";
import { getDecisions } from "@/lib/data/decisions";

export const metadata: Metadata = {
  title: "Meetings & Decisions",
  description:
    "View agendas, minutes, and decisions from HOA Board and community meetings.",
};

const MEETING_TYPE_LABELS: Record<string, string> = {
  board: "Board Meeting",
  annual: "Annual Meeting",
  special: "Special Meeting",
};

const DECISION_STATUS_CONFIG: Record<string, { icon: React.ElementType; color: string; label: string }> = {
  approved: { icon: CheckCircle2, color: "text-green-600 dark:text-green-400", label: "Approved" },
  rejected: { icon: XCircle, color: "text-red-600 dark:text-red-400", label: "Rejected" },
  tabled: { icon: MinusCircle, color: "text-amber-600 dark:text-amber-400", label: "Tabled" },
};

export default async function MeetingsPage() {
  const [upcomingMeetings, pastMeetings, recentDecisions] = await Promise.all([
    getUpcomingMeetings(5),
    getPastMeetings(10),
    getDecisions({ limit: 10 }),
  ]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

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
          <TabsTrigger value="upcoming">
            Upcoming
            {upcomingMeetings.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {upcomingMeetings.length}
              </Badge>
            )}
          </TabsTrigger>
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
                          {MEETING_TYPE_LABELS[meeting.type] || meeting.type}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        >
                          Scheduled
                        </Badge>
                      </div>
                      <CardTitle>{meeting.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(meeting.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{formatTime(meeting.date)}</span>
                    </div>
                    {meeting.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{meeting.location}</span>
                      </div>
                    )}
                  </div>
                  {meeting.agenda && (
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold text-sm mb-2">Agenda</h4>
                      <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans">
                        {meeting.agenda}
                      </pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-dashed">
              <CardContent className="py-8 text-center">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg mb-2">No Upcoming Meetings</h3>
                <p className="text-muted-foreground">
                  Check back later for scheduled meetings.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Past Meetings */}
        <TabsContent value="past" className="space-y-4">
          {pastMeetings.length > 0 ? (
            pastMeetings.map((meeting) => (
              <Card key={meeting.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">
                          {MEETING_TYPE_LABELS[meeting.type] || meeting.type}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(meeting.date)}
                        </span>
                      </div>
                      <CardTitle className="text-lg">{meeting.title}</CardTitle>
                      {meeting.summary && (
                        <CardDescription className="mt-2">
                          {meeting.summary}
                        </CardDescription>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/meetings/${meeting.id}`}>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>Minutes available</span>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-dashed">
              <CardContent className="py-8 text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No past meetings on record.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Decisions */}
        <TabsContent value="decisions" className="space-y-4">
          {recentDecisions.length > 0 ? (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                {recentDecisions.length} decisions on record
              </p>
              {recentDecisions.map((decision) => {
                const statusConfig = DECISION_STATUS_CONFIG[decision.status];
                const StatusIcon = statusConfig.icon;
                return (
                  <Card key={decision.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <StatusIcon className={`h-4 w-4 ${statusConfig.color}`} />
                            <Badge
                              variant="secondary"
                              className={
                                decision.status === "approved"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : decision.status === "rejected"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                  : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                              }
                            >
                              {statusConfig.label}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {formatDate(decision.meeting_date)}
                            </span>
                          </div>
                          <CardTitle className="text-lg">{decision.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {decision.summary && (
                        <p className="text-sm text-muted-foreground mb-3">
                          {decision.summary}
                        </p>
                      )}
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        {decision.votes_for !== null && (
                          <div className="flex items-center gap-2">
                            <Vote className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {decision.votes_for} for
                              {decision.votes_against !== null && `, ${decision.votes_against} against`}
                              {decision.votes_abstain !== null && decision.votes_abstain > 0 && `, ${decision.votes_abstain} abstain`}
                            </span>
                          </div>
                        )}
                        <Link
                          href={`/meetings/${decision.meeting_id}`}
                          className="text-primary hover:underline text-sm"
                        >
                          {decision.meeting_title}
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </>
          ) : (
            <Card className="border-dashed">
              <CardContent className="py-8 text-center">
                <Vote className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg mb-2">Decision Log Coming Soon</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  We&apos;re working on a searchable log of all board decisions with
                  links to related meeting minutes.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
