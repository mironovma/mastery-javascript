import { Card, CardContent } from "@/shared/ui/card";

interface MemorizeWordCardProps {
    word: string;
    translation: string;
    transcription?: string;
    picture?: string;
}

export const MemorizeWordCard = ({
    word,
    translation,
    transcription,
    picture,
}: MemorizeWordCardProps) => {
    return (
        <Card className="w-full h-full">
            <CardContent className="py-6">{word}</CardContent>

            <hr />

            <CardContent className="py-6">{translation}</CardContent>
        </Card>
    );
};
