export interface EventProps {
    id: string;
    title: string;
    image: string;
    date: string;
    location: string;
    club: string;
    attendees: number;
    isHot?: boolean;
  }
  
  export const UPCOMING_EVENTS: EventProps[] = [
    {
      id: "1",
      title: "F-Camp 2024: The Awakening",
      image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1000",
      date: "20/08/2024 - 07:00",
      location: "Sân băng, ĐH FPT Hòa Lạc",
      club: "Phòng CTSV",
      attendees: 1200,
      isHot: true,
    },
    {
      id: "2",
      title: "Talkshow: AI Revolution in SE",
      image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=1000",
      date: "25/08/2024 - 14:00",
      location: "Hội trường Beta",
      club: "JS Club",
      attendees: 150,
    },
    {
      id: "3",
      title: "Music Show: Melody of Summer",
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1000",
      date: "28/08/2024 - 19:00",
      location: "Hội trường Alpha",
      club: "Melody Club",
      attendees: 500,
      isHot: true,
    },
    {
      id: "4",
      title: "Workshop: Kỹ năng viết CV chuẩn ATS",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1000",
      date: "30/08/2024 - 09:00",
      location: "Phòng 304R, Alpha",
      club: "SoftSkill Dept",
      attendees: 80,
    },
    {
       id: "5",
       title: "Triển lãm Art & Design",
       image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=1000",
       date: "01/09/2024 - 08:00",
       location: "Sảnh Delta",
       club: "Design Club",
       attendees: 300,
     },
  ];
  
  export const RECOMMENDED_EVENTS: EventProps[] = [
    {
      id: "6",
      title: "Hackathon: Code War 2024",
      image: "https://images.unsplash.com/photo-1504384308090-c54be3852f33?q=80&w=1000",
      date: "05/09/2024 - 08:00",
      location: "Sảnh Beta",
      club: "F-Code",
      attendees: 300,
      isHot: true,
    },
    {
      id: "7",
      title: "Workshop: ReactJS for Beginners",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000",
      date: "10/09/2024 - 18:00",
      location: "Phòng 202, Delta",
      club: "JS Club",
      attendees: 60,
    },
    {
      id: "8",
      title: "Seminar: Blockchain & Web3",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000",
      date: "12/09/2024 - 14:00",
      location: "Hội trường C",
      club: "Blockchain Lab",
      attendees: 200,
    },
    {
      id: "9",
      title: "Cuộc thi: Capture The Flag",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000",
      date: "15/09/2024 - 08:00",
      location: "Phòng Lab 3",
      club: "FPT Jetking",
      attendees: 100,
    }
  ];