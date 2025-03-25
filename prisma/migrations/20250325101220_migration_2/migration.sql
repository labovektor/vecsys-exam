-- AlterTable
ALTER TABLE "Exam" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "ParticipantAnswer" ADD CONSTRAINT "ParticipantAnswer_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
