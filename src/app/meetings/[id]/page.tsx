import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  FileText,
  Vote,
  CheckCircle2,
  XCircle,
  MinusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getMeetingById } from "@/lib/data/meetings";
import { getDecisionsByMeeting } from "@/lib/data/decisions";

interface MeetingPageProps {
  params: Promise<{
    id: string;
  }>;
}

const MEETING_TYPE_LABELS: Record<string, string> = {
  board: "Board Meeting",
  annual: "Annual Meeting",
  special: "Special Meeting",
};

const DECISION_STATUS_CONFIG: Record<
  string,
  { icon: React.ElementType; color: string; label: string }
> = {
  approved: {
    icon: CheckCircle2,
    color: "text-green-600 dark:text-green-400",
    label: "Approved",
  },
  rejected: {
    icon: XCircle,
    color: "text-red-600 dark:text-red-400",
    label: "Rejected",
  },
  tabled: {
    icon: MinusCircle,
    color: "text-amber-600 dark:text-amber-400",
    label: "Tabled",
  },
};

export async function generateMetadata({
  params,
}: MeetingPageProps): Promise<Metadata> {
  const { id } = await params;
  const meeting = await getMeetingById(id);

  if (!meeting) {
    return {
      title: "Meeting Not Found",
    };
  }

  return {
    title: meeting.title,
    description: meeting.summary || `Details for ${meeting.title}`,
  };
}

export default async function MeetingPage({ params }: MeetingPageProps) {
  const { id } = await params;
  const [meeting, decisions] = await Promise.all([
    getMeetingById(id),
    getDecisionsByMeeting(id),
  ]);

  if (!meeting) {
    notFound();
  }

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

  const isPast = new Date(meeting.date) < new Date();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Navigation */}
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/meetings">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Meetings
          </Link>
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Meeting Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">
                      {MEETING_TYPE_LABELS[meeting.type] || meeting.type}
                    </Badge>
                    {isPast ? (
                      <Badge variant="secondary">Completed</Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      >
                        Scheduled
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-2xl">{meeting.title}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Meeting Meta */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
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

              {/* Summary */}
              {meeting.summary && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Summary</h3>
                  <p className="text-muted-foreground">{meeting.summary}</p>
                </div>
              )}

              {/* Agenda */}
              {meeting.agenda && (
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Agenda</h4>
                  <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans">
                    {meeting.agenda}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Decisions from this meeting */}
          {decisions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Vote className="h-5 w-5" />
                  Decisions Made
                </CardTitle>
                <CardDescription>
                  {decisions.length} decision{decisions.length !== 1 ? "s" : ""}{" "}
                  recorded from this meeting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {decisions.map((decision) => {
                  const statusConfig = DECISION_STATUS_CONFIG[decision.status];
                  const StatusIcon = statusConfig.icon;
                  return (
                    <div
                      key={decision.id}
                      className="p-4 border rounded-lg space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold">{decision.title}</h4>
                        <div className="flex items-center gap-1">
                          <StatusIcon
                            className={`h-4 w-4 ${statusConfig.color}`}
                          />
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
                        </div>
                      </div>
                      {decision.summary && (
                        <p className="text-sm text-muted-foreground">
                          {decision.summary}
                        </p>
                      )}
                      {decision.votes_for !== null && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Vote className="h-4 w-4" />
                          <span>
                            {decision.votes_for} for
                            {decision.votes_against !== null &&
                              `, ${decision.votes_against} against`}
                            {decision.votes_abstain !== null &&
                              decision.votes_abstain > 0 &&
                              `, ${decision.votes_abstain} abstain`}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Related Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Related Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Meeting minutes and related documents will be linked here when
                available.
              </p>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/documents?type=minutes">Browse All Minutes</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/meetings">
                  <Calendar className="h-4 w-4 mr-2" />
                  All Meetings
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/documents">
                  <FileText className="h-4 w-4 mr-2" />
                  Document Library
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
