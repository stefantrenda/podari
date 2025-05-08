import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DonationItem } from "@/types";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DonationCardProps {
  donation: DonationItem;
}

const DonationCard: React.FC<DonationCardProps> = ({ donation }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("mk-MK", {
      day: "numeric",
      month: "short",
    }).format(date);
  };

  const getConditionLabel = (condition: string) => {
    const conditions: Record<string, string> = {
      new: "Ново",
      "like-new": "Како ново",
      good: "Добро",
      fair: "Задоволително",
      poor: "Лошо",
    };
    return conditions[condition] || condition;
  };

  const handleControlClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const items = [
    {
      title: "Mountain View",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Ocean Sunset",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Forest Trail",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "City Skyline",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Desert Landscape",
      image: "/placeholder.svg?height=300&width=500",
    },
  ];

  return (
    <>
      <Link to={`/donation/${donation.id}`} className="block">
        <Card className="donation-card h-full flex flex-col">
          <div className="relative w-full aspect-square bg-muted overflow-hidden">
            {donation.image ? (
              // <img
              //   src={donation.image}
              //   alt={donation.title}
              //   className="w-full h-full object-cover transition-transform hover:scale-105"
              //   loading="lazy"
              // />

              <Carousel>
                <CarouselContent>
                  {/* {donation?.image?.map((imgUrl, index) => ( */}
                  <CarouselItem>
                    <img
                      src={donation.image}
                      alt={`${donation.title} `}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                      loading="lazy"
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <img
                      src={
                        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1770&auto=format&fit=crop"
                      }
                      alt={`${donation.title} `}
                      className="w-full h-full object-cover aspect-square  transition-transform hover:scale-105"
                      loading="lazy"
                    />
                  </CarouselItem>
                  {/* ))} */}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                Нема слика
              </div>
            )}
            <div className="absolute top-2 right-2">
              <Badge variant="secondary">{donation.category}</Badge>
            </div>
          </div>
          <CardHeader className="p-3 pb-1">
            <CardTitle className="text-lg truncate">{donation.title}</CardTitle>
            <CardDescription className="flex justify-between items-center">
              <span>{donation.city}</span>
              <span>{formatDate(donation.createdAt)}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3 pt-0 pb-0 flex-grow">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {donation.description}
            </p>
          </CardContent>
          <CardFooter className="p-3 pt-2 flex justify-between">
            <Badge variant="outline">
              {getConditionLabel(donation.condition)}
            </Badge>
            {donation.contactPhone && (
              <span className="text-sm text-muted-foreground">
                {donation.contactPhone}
              </span>
            )}
          </CardFooter>
        </Card>
      </Link>
    </>
  );
};

export default DonationCard;
