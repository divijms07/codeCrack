import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";


function EndCallButton(){

  const call = useCall();
  const router = useRouter();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const updateInterviewStatus = useMutation(api.interviews.updateInterviewStatus);

  const interview = useQuery(api.interviews.getInterviewsByStreamCallId, {
    streamCallId: call?.id || "", 
  }); 

  if(!call || !interview) return null;
  //End Call Can be done by meeting owner so
  const isMeetingOwner = localParticipant?.userId === call.state.createdBy?.id;
  if(!isMeetingOwner) return null;

  const endCall = async () => {
    try{
      await call.endCall();

      if (!interview) {
        throw new Error("Interview not found");
      }

      await updateInterviewStatus({
        interviewId: interview._id,
        status: "completed",
      })
      router.push("/");
      toast.success("Interview ended successfully");

    } catch (error) {
      console.error("Error ending call:", error);
      toast.error("Error ending call. Please try again.");
    }
  }

  return (
    <Button variant={"destructive"} onClick={endCall}>
      End Meet
    </Button>
  );
}
export default EndCallButton;