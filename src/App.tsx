import { useState, useCallback, useEffect } from 'react'
import { Container, AppBar, Toolbar, Typography, Button, Box, Card, CardContent, TextField, Alert, IconButton, Menu, MenuItem, Rating } from '@mui/material'
import { Phone, Email, LocationOn, Home, Menu as MenuIcon } from '@mui/icons-material'
// Removed EmailJS - now using PHP backend
import './App.css'

// Move components outside App to prevent re-creation on every render

// Define review type
interface Review {
  id: number
  author_name: string
  rating: number
  text: string
  time: string
  profile_photo_url: string
  relative_time_description: string
}

// Google Reviews Component
const GoogleReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(false)

  // Your business Place ID for Upright Heating and Cooling
  const PLACE_ID = 'ChIJvRlGxvQzmYcRvOGXl-DT3_Y'
  const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY

  // Real reviews from Google Business Profile
  const actualReviews = [
    {
      id: 1,
      author_name: "Kristen Mccall",
      rating: 5,
      text: "I have used them many times for multiple properties I have managed. Reid is great to work with for replacements, routine maintenance and repairs!",
      time: "a week ago",
      profile_photo_url: "",
      relative_time_description: "a week ago"
    },
    {
      id: 2,
      author_name: "Gary Fulker",
      rating: 5,
      text: "I highly recommend this company for your heating and cooling repairs. Reid responded quickly and fixed the problem in no time. Very professional and good rates.",
      time: "2 months ago",
      profile_photo_url: "",
      relative_time_description: "2 months ago"
    },
    {
      id: 3,
      author_name: "Jenny Melrose",
      rating: 5,
      text: "Not only was our HVAC diagnosed and fixed the same day but we had an appointment an hour after calling. Reid went above and beyond in checking both our units after replacing a part that previously went undiagnosed by another service provider. I would highly recommend them.",
      time: "2 months ago",
      profile_photo_url: "",
      relative_time_description: "2 months ago"
    },
    {
      id: 4,
      author_name: "J Jurek",
      rating: 5,
      text: "Reid was the first person who was available to come out and look and I would have saved a ton of time if I had just known to go with him right off the bat. He showed up on time and listened to what I was thinking. I really appreciated that he didn't try to push any particular brand like a lot of the other companies. Really appreciate the work he did for us and have been consistently recommending him whenever it comes up.",
      time: "2 months ago",
      profile_photo_url: "",
      relative_time_description: "2 months ago"
    },
    {
      id: 5,
      author_name: "Carissa Mason",
      rating: 5,
      text: "When my A/C stopped working, I took social media to find a local HVAC repairman. Upright heating and cooling was suggested several times so I gave them a call. Reid was fantastic! He arrived at my home within 30 minutes of the call, had my HVAC unit repaired in less than 30 minutes and was very reasonably priced.",
      time: "3 months ago",
      profile_photo_url: "",
      relative_time_description: "3 months ago"
    },
    {
      id: 6,
      author_name: "Tanner Hatley",
      rating: 5,
      text: "I can't recommend Upright Heating and Cooling highly enough! I called with an issue and Reid, the owner, was out at my home the same day to assess the situation. Within 72 hours, I had a brand new mini split system installed—quick, clean, and professionally done. Reid was honest, responsive, and incredibly knowledgeable.",
      time: "3 months ago",
      profile_photo_url: "",
      relative_time_description: "3 months ago"
    }
  ]

  const fetchGoogleReviews = async () => {
    if (!API_KEY) {
      console.log('Using actual reviews - API key not configured')
      setReviews(actualReviews)
      return
    }

    try {
      setLoading(true)

      // Direct call to Google Places API (for development)
      // In production, you should use a backend proxy to hide the API key
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${API_KEY}`

      // Use a CORS proxy for development
      const proxyUrl = `https://cors-anywhere.herokuapp.com/${url}`

      console.log('Fetching reviews from:', url)

      const response = await fetch(proxyUrl, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('API Response:', data)

      if (data.status === 'OK' && data.result?.reviews) {
        const formattedReviews = data.result.reviews.map((review: any, index: number) => ({
          id: index + 1,
          author_name: review.author_name,
          rating: review.rating,
          text: review.text,
          time: review.relative_time_description,
          profile_photo_url: review.profile_photo_url || "",
          relative_time_description: review.relative_time_description
        }))
        console.log('Formatted reviews:', formattedReviews)
        setReviews(formattedReviews)
      } else {
        console.log('API response not OK or no reviews:', data)
        throw new Error('No reviews found')
      }
    } catch (err) {
      console.error('Error fetching Google reviews:', err)
      console.log('Falling back to actual reviews')
      // Fallback to actual reviews
      setReviews(actualReviews)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGoogleReviews()
  }, [])

  const renderStars = (rating: number) => {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Rating value={rating} readOnly size="small" />
        <Typography variant="body2" sx={{ ml: 1, color: '#666' }}>
          ({rating}/5)
        </Typography>
      </Box>
    )
  }

  if (loading) {
    return (
      <Box sx={{ backgroundColor: '#F8F9FA', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" textAlign="center" sx={{ color: '#DC143C' }}>
            Loading Reviews...
          </Typography>
        </Container>
      </Box>
    )
  }

  return (
    <Box sx={{ backgroundColor: '#F8F9FA', py: 6, overflow: 'hidden' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ color: '#DC143C', mb: 1 }}>
          What Our Customers Say
        </Typography>
        <Typography variant="h6" textAlign="center" sx={{ mb: 4, color: '#666' }}>
          18 Five-Star Reviews • Trusted throughout Denver, NC and surrounding areas
        </Typography>

        {/* Scrolling Reviews Container */}
        <Box sx={{
          position: 'relative',
          overflow: 'hidden',
          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            width: '100px',
            height: '100%',
            zIndex: 2,
            pointerEvents: 'none'
          },
          '&::before': {
            left: 0,
            background: 'linear-gradient(to right, #F8F9FA, transparent)'
          },
          '&::after': {
            right: 0,
            background: 'linear-gradient(to left, #F8F9FA, transparent)'
          }
        }}>
          <Box sx={{
            display: 'flex',
            animation: 'scroll 30s linear infinite',
            gap: 3,
            '@keyframes scroll': {
              '0%': { transform: 'translateX(0)' },
              '100%': { transform: 'translateX(-50%)' }
            }
          }}>
            {/* Duplicate reviews for seamless scrolling */}
            {[...reviews, ...reviews].map((review, index) => (
              <Card key={`${review.id}-${index}`} sx={{
                minWidth: 350,
                maxWidth: 350,
                p: 3,
                backgroundColor: 'white',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                borderRadius: 2,
                border: '1px solid #E0E0E0',
                flexShrink: 0
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    backgroundColor: '#DC143C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                      {review.author_name.charAt(0)}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ color: '#DC143C', fontWeight: 'bold' }}>
                      {review.author_name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      {review.time}
                    </Typography>
                  </Box>
                </Box>
                {renderStars(review.rating)}
                <Typography variant="body2" sx={{
                  lineHeight: 1.6,
                  color: '#333',
                  display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  "{review.text}"
                </Typography>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="h5" sx={{ color: '#DC143C', mb: 2, fontWeight: 'bold' }}>
            Ready to Join Our Satisfied Customers?
          </Typography>
          <Button
            variant="contained"
            size="large"
            href="tel:704-884-5165"
            sx={{
              backgroundColor: '#DC143C',
              color: 'white',
              fontWeight: 'bold',
              px: 4,
              py: 1.5,
              mr: 2,
              '&:hover': {
                backgroundColor: '#FF4444',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(139, 21, 56, 0.4)'
              }
            }}
          >
            Call (704) 884-5165
          </Button>
          <Button
            variant="outlined"
            size="large"
            href="https://www.google.com/maps/place/Upright+Heating+and+Cooling/@35.5038265,-81.0783305,10z/data=!3m1!4b1!4m6!3m5!1s0x87a139f4c44619bd:0xd6cfd3e09790e1bc!8m2!3d35.5038265!4d-81.0783305!16s%2Fg%2F11lf3x7trt?hl=en"
            target="_blank"
            sx={{
              borderColor: '#DC143C',
              color: '#DC143C',
              fontWeight: 'bold',
              px: 4,
              py: 1.5,
              '&:hover': {
                borderColor: '#FF4444',
                backgroundColor: 'rgba(139, 21, 56, 0.05)'
              }
            }}
          >
            Leave a Review
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
const HomePage = ({ setCurrentPage }: { setCurrentPage: (page: string) => void }) => (
  <Box>
    {/* Hero Section */}
    <Box
      sx={{
        backgroundImage: 'linear-gradient(rgba(70, 70, 70, 0.7), rgba(100, 100, 100, 0.7)), url("/images/e3fc3a8c-e076-4ec8-b176-cbb5d18d460d.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        color: 'white',
        py: 10,
        textAlign: 'center',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 2, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          Upright HVAC
        </Typography>
        <Typography variant="h5" sx={{ mb: 4, opacity: 0.95, textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
          Professional HVAC Services in Denver, NC | AC Repair & Heating Contractor
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, opacity: 0.9, textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
          Licensed HVAC contractor serving Lincoln County, Gastonia, Charlotte, Hickory & surrounding areas
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, opacity: 0.95, fontStyle: 'italic', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
          "Upright Service, Just-Right Comfort."
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: '#E0E0E0',
            color: '#DC143C',
            fontWeight: 'bold',
            px: 4,
            py: 1.5,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            '&:hover': {
              backgroundColor: '#D0D0D0',
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 16px rgba(0,0,0,0.4)'
            }
          }}
          onClick={() => setCurrentPage('quote')}
        >
          Contact Now
        </Button>
      </Container>
    </Box>

    {/* Services Section */}
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ color: '#DC143C', mb: 6 }}>
        Our Services
      </Typography>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
        gap: 4,
        justifyContent: 'center'
      }}>
        <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
          <Box
            component="img"
            src="/images/acunit-2.png"
            alt="Professional HVAC Installation"
            sx={{
              width: '100%',
              height: { xs: 200, md: 200 },
              objectFit: 'cover',
              objectPosition: 'center center',
              borderRadius: 1,
              mb: 2
            }}
          />
          <CardContent>
            <Typography variant="h5" component="h3" gutterBottom sx={{ color: '#DC143C' }}>
              HVAC Installation
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Complete HVAC installation services in Denver, NC including furnace installation, AC unit installation, and heat pump systems. <strong>Trane authorized dealer</strong> with expertise in all major brands.
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
          <Box
            component="img"
            src="/images/406cc9d6-882d-481a-8a19-00fbd39bd2bf.jpg"
            alt="HVAC Equipment and Repairs"
            sx={{
              width: '100%',
              height: { xs: 200, md: 200 },
              objectFit: 'cover',
              objectPosition: 'center',
              borderRadius: 1,
              mb: 2
            }}
          />
          <CardContent>
            <Typography variant="h5" component="h3" gutterBottom sx={{ color: '#DC143C' }}>
              Repair Services
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Emergency AC repair and heating repair services in Denver, NC. Same-day service for furnace repair, air conditioner repair, and heat pump troubleshooting.
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
          <Box
            component="img"
            src="/images/ba0c4e26-b61e-4f60-a6dd-4f0e1eb2a11d.jpg"
            alt="HVAC Maintenance and Service"
            sx={{
              width: '100%',
              height: { xs: 200, md: 200 },
              objectFit: 'cover',
              objectPosition: 'center',
              borderRadius: 1,
              mb: 2
            }}
          />
          <CardContent>
            <Typography variant="h5" component="h3" gutterBottom sx={{ color: '#DC143C' }}>
              Maintenance
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Preventive HVAC maintenance in Denver, NC including filter changes, system tune-ups, and seasonal inspections to improve efficiency and prevent costly repairs.
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
          <Box
            component="img"
            src="/images/dbd4bf63-be55-490e-9c37-4f71d0f89567.jpg"
            alt="Ductwork Installation and Repair"
            sx={{
              width: '100%',
              height: { xs: 200, md: 200 },
              objectFit: 'cover',
              objectPosition: 'center',
              borderRadius: 1,
              mb: 2
            }}
          />
          <CardContent>
            <Typography variant="h5" component="h3" gutterBottom sx={{ color: '#DC143C' }}>
              Ductwork Services
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Professional ductwork installation, repair, and replacement services in Denver, NC. Improve airflow efficiency and indoor air quality with expert duct sealing and cleaning.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>

    {/* About Reid Section */}
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ color: '#DC143C', mb: 6 }}>
        Meet Reid Upright
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ flex: { xs: '1 1 100%', md: '0 0 300px' }, textAlign: 'center' }}>
          <Box
            component="img"
            src="/images/6d23a426-631e-4ab4-a7db-56bbd5ea5f34.jpg"
            alt="Reid Upright, Owner of Upright HVAC"
            sx={{
              width: '100%',
              maxWidth: 300,
              height: 'auto',
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}
          />
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 400px' }, maxWidth: 500 }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#DC143C', mb: 3 }}>
            Your Trusted Local HVAC Expert
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7, color: '#333' }}>
            At Upright Heating and Cooling, we believe comfort starts with trust. With over 10 years of hands-on experience, we provide expert heating, cooling, and indoor air quality solutions for homes and businesses in the Denver area and beyond.
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7, color: '#333' }}>
            As a locally owned and operated company, we understand the climate challenges our community faces and deliver cost-effective, reliable solutions tailored to your needs. <strong>Specializing in Trane Systems</strong> while servicing all major brands.
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7, color: '#333' }}>
            Licensed, insured, and committed to honest service, we treat every customer like family. Whether you need emergency repairs, routine maintenance, or a complete system installation, Reid and his team deliver professional results you can trust.
          </Typography>
          <Box sx={{
            mt: 4,
            p: 3,
            backgroundColor: '#DC143C',
            borderRadius: 2,
            textAlign: 'center'
          }}>
            <Typography variant="h5" sx={{ color: 'white', fontStyle: 'italic', fontWeight: 'bold' }}>
              "Upright Service, Just-Right Comfort."
            </Typography>
          </Box>
          <Box sx={{
            mt: 3,
            p: 2,
            backgroundColor: '#F5F5F5',
            borderRadius: 1,
            border: '1px solid #E0E0E0'
          }}>
            <Typography variant="body2" sx={{ color: '#DC143C', fontWeight: 'bold', textAlign: 'center' }}>
              NC Licensed Contractor #36541
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>


    {/* Why Choose Us Section */}
    <Box sx={{ backgroundColor: '#F5F5F5', py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ color: '#DC143C', mb: 6 }}>
          Why Choose Upright HVAC?
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 400px' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <LocationOn sx={{ fontSize: 40, color: '#FF4444', mr: 2 }} />
              <Box>
                <Typography variant="h6" sx={{ color: '#DC143C' }}>Local Denver, NC HVAC Experts</Typography>
                <Typography variant="body2" color="text.secondary">
                  Licensed HVAC contractor serving Lincoln County and surrounding areas with next-day emergency service
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 400px' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Home sx={{ fontSize: 40, color: '#FF4444', mr: 2 }} />
              <Box>
                <Typography variant="h6" sx={{ color: '#DC143C' }}>Trane Authorized Dealer</Typography>
                <Typography variant="body2" color="text.secondary">
                  Professional AC repair, heating repair, and HVAC installation services you can trust for residential and commercial properties
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>

    {/* Google Reviews Section */}
    <GoogleReviews />
  </Box>
)

const ContactPage = ({ setCurrentPage }: { setCurrentPage: (page: string) => void }) => (
  <Box>
    {/* Contact Hero Section */}
    <Box
      sx={{
        backgroundImage: 'linear-gradient(rgba(139, 21, 56, 0.9), rgba(197, 60, 60, 0.9)), url("/images/fb6190f4-0758-4c74-bbca-5282ce871c79.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        py: 8,
        textAlign: 'center'
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          Ready to Get Started?
        </Typography>
        <Typography variant="h5" sx={{ mb: 4, opacity: 0.95, textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
          Let's solve your heating and cooling needs today
        </Typography>
      </Container>
    </Box>

    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Emergency Banner */}
      <Box sx={{
        backgroundColor: '#FF4444',
        color: 'white',
        p: 4,
        borderRadius: 2,
        textAlign: 'center',
        mb: 6,
        boxShadow: '0 4px 12px rgba(197, 60, 60, 0.3)'
      }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Emergency HVAC Service Available
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, opacity: 0.95 }}>
          HVAC emergency? We provide next-day service to get you comfortable again
        </Typography>
        <Button
          variant="contained"
          size="large"
          href="tel:704-884-5165"
          sx={{
            backgroundColor: 'white',
            color: '#FF4444',
            fontWeight: 'bold',
            px: 4,
            py: 1.5,
            '&:hover': { backgroundColor: '#F5F5F5' }
          }}
        >
          Call Now: (704) 884-5165
        </Button>
      </Box>

      {/* Main Contact Grid */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 6 }}>
        {/* Quick Contact Card */}
        <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 350px' } }}>
          <Card sx={{
            p: 4,
            height: '100%',
            background: 'linear-gradient(135deg, #DC143C 0%, #FF4444 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
              Contact Information
            </Typography>

            <Box sx={{ mb: 3, position: 'relative', zIndex: 1 }}>
              <Typography variant="h6" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <Phone sx={{ mr: 1 }} /> Call Reid Directly
              </Typography>
              <Typography variant="h5" component="a" href="tel:704-884-5165" sx={{
                color: 'white',
                textDecoration: 'none',
                fontWeight: 'bold',
                '&:hover': { textShadow: '0 0 8px rgba(255,255,255,0.8)' }
              }}>
                (704) 884-5165
              </Typography>
            </Box>

            <Box sx={{ mb: 3, position: 'relative', zIndex: 1 }}>
              <Typography variant="h6" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <Email sx={{ mr: 1 }} /> Email Us
              </Typography>
              <Typography variant="body1" component="a" href="mailto:uprighthvac@gmail.com" sx={{
                color: 'white',
                textDecoration: 'none',
                '&:hover': { textShadow: '0 0 8px rgba(255,255,255,0.8)' }
              }}>
                uprighthvac@gmail.com
              </Typography>
            </Box>

            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography variant="h6" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <LocationOn sx={{ mr: 1 }} /> Service Area
              </Typography>
              <Typography variant="body1">
                Denver, NC + 40 Mile Radius
              </Typography>
            </Box>
          </Card>
        </Box>

        {/* Service Request Card */}
        <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 450px' } }}>
          <Card sx={{ p: 4, height: '100%' }}>
            <Typography variant="h4" gutterBottom sx={{ color: '#DC143C', mb: 3 }}>
              Professional HVAC Services
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 4 }}>
              {[
                { title: 'Air Conditioning Repair', desc: 'System diagnostics and repair services' },
                { title: 'Heating System Service', desc: 'Furnace and heat pump maintenance' },
                { title: 'Airflow Optimization', desc: 'Ductwork and ventilation solutions' },
                { title: 'Energy Efficiency', desc: 'System upgrades and assessments' }
              ].map((item, index) => (
                <Box key={index} sx={{
                  p: 3,
                  borderRadius: 1,
                  backgroundColor: '#F5F5F5',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  border: '1px solid #E0E0E0',
                  '&:hover': {
                    backgroundColor: '#DC143C',
                    color: 'white',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(139, 21, 56, 0.3)'
                  }
                }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>{item.title}</Typography>
                  <Typography variant="body2">{item.desc}</Typography>
                </Box>
              ))}
            </Box>

            <Typography variant="body1" sx={{ mb: 3, color: '#333' }}>
              <strong>Free Estimates Available!</strong> Reid will assess your situation and provide honest, upfront pricing before any work begins.
            </Typography>

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={() => setCurrentPage('quote')}
              sx={{
                backgroundColor: '#DC143C',
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': {
                  backgroundColor: '#FF4444',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(139, 21, 56, 0.4)'
                }
              }}
            >
              Request an Appointment
            </Button>
          </Card>
        </Box>
      </Box>

      {/* Why Choose Reid Section */}
      <Card sx={{ p: 4, mb: 6, backgroundColor: '#F8F9FA' }}>
        <Typography variant="h4" textAlign="center" gutterBottom sx={{ color: '#DC143C', mb: 4 }}>
          Why Denver, NC Trusts Reid Upright
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3 }}>
          {[
            { title: 'Same-Day Service', desc: 'Most repairs completed the same day you call' },
            { title: 'Trane Specialist', desc: 'Authorized dealer with specialized training in Trane systems' },
            { title: 'Licensed & Insured', desc: 'NC License #36541 - Your protection guaranteed' },
            { title: 'Transparent Pricing', desc: 'Upfront pricing - you know the cost before we start' },
            { title: 'Local & Reliable', desc: 'Your neighbor in Denver, NC who stands behind his work' },
            { title: 'Emergency Service', desc: 'Next-day emergency service when you need it most' }
          ].map((item, index) => (
            <Box key={index} sx={{
              textAlign: 'center',
              p: 3,
              backgroundColor: 'white',
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              border: '1px solid #E0E0E0',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
              }
            }}>
              <Typography variant="h6" sx={{ color: '#DC143C', mb: 2, fontWeight: 'bold' }}>{item.title}</Typography>
              <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
            </Box>
          ))}
        </Box>
      </Card>

      {/* Final CTA */}
      <Box sx={{
        textAlign: 'center',
        p: 4,
        backgroundColor: '#DC143C',
        color: 'white',
        borderRadius: 2
      }}>
        <Typography variant="h4" gutterBottom>
          Ready to Experience the Upright Difference?
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
          Join hundreds of satisfied customers in Denver, NC and surrounding areas
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="large"
            href="tel:704-884-5165"
            sx={{
              backgroundColor: 'white',
              color: '#DC143C',
              fontWeight: 'bold',
              px: 4,
              py: 1.5,
              '&:hover': { backgroundColor: '#F5F5F5' }
            }}
          >
            Call (704) 884-5165
          </Button>
          <Button
            variant="outlined"
            size="large"
            href="mailto:uprighthvac@gmail.com"
            sx={{
              borderColor: 'white',
              color: 'white',
              fontWeight: 'bold',
              px: 4,
              py: 1.5,
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            Send Email
          </Button>
        </Box>
      </Box>
    </Container>
  </Box>
)

interface QuotePageProps {
  formData: {
    name: string
    phone: string
    email: string
    details: string
  }
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleFormSubmit: (e: React.FormEvent) => void
  formStatus: string
  isSubmitting: boolean
}

const QuotePage = ({ formData, handleFormChange, handleFormSubmit, formStatus, isSubmitting }: QuotePageProps) => (
  <Container maxWidth="md" sx={{ py: 8 }}>
    <Typography variant="h3" component="h1" textAlign="center" gutterBottom sx={{ color: '#DC143C', mb: 2 }}>
      Get Your Free HVAC Estimate
    </Typography>
    <Typography variant="h6" textAlign="center" sx={{ mb: 6, color: '#666' }}>
      Fill out the form below and Reid will get back to you with a personalized quote
    </Typography>

    {formStatus === 'success' && (
      <Alert severity="success" sx={{ mb: 4 }}>
        Thank you! Your request has been sent directly to Reid. He'll contact you soon!
      </Alert>
    )}

    {formStatus === 'error' && (
      <Alert severity="error" sx={{ mb: 4 }}>
        Sorry, there was an error sending your request. Please try calling (704) 884-5165 directly.
      </Alert>
    )}

    <Card sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <form onSubmit={handleFormSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            name="name"
            label="Full Name"
            value={formData.name}
            onChange={handleFormChange}
            required
            fullWidth
            variant="outlined"
          />

          <TextField
            name="phone"
            label="Phone Number"
            value={formData.phone}
            onChange={handleFormChange}
            required
            fullWidth
            variant="outlined"
            type="tel"
          />

          <TextField
            name="email"
            label="Email Address"
            value={formData.email}
            onChange={handleFormChange}
            required
            fullWidth
            variant="outlined"
            type="email"
          />

          <TextField
            name="details"
            label="Project Details"
            value={formData.details}
            onChange={handleFormChange}
            required
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            placeholder="Please describe your HVAC needs (installation, repair, maintenance, etc.)"
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isSubmitting}
            sx={{
              backgroundColor: '#DC143C',
              py: 1.5,
              fontSize: '1.1rem',
              '&:hover': {
                backgroundColor: '#FF4444',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(139, 21, 56, 0.4)'
              },
              '&:disabled': {
                backgroundColor: '#ccc'
              }
            }}
          >
            {isSubmitting ? 'Sending...' : 'Send My Request'}
          </Button>
        </Box>
      </form>

      <Box sx={{ mt: 4, p: 3, backgroundColor: '#F8F9FA', borderRadius: 1 }}>
        <Typography variant="h6" sx={{ color: '#DC143C', mb: 2 }}>
          What happens next?
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          ✓ Reid will review your request within 24 hours
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          ✓ He'll contact you to discuss your project
        </Typography>
        <Typography variant="body2">
          ✓ Free, no-obligation estimate provided
        </Typography>
      </Box>
    </Card>
  </Container>
)

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    details: ''
  })
  const [formStatus, setFormStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null)

  const handleFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }, [])

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus('')

    try {
      const response = await fetch('/send-email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          details: formData.details
        })
      })

      if (response.ok) {
        setFormStatus('success')
        setFormData({ name: '', phone: '', email: '', details: '' })
      } else {
        throw new Error('Failed to send email')
      }
    } catch (error) {
      console.error('Email send failed:', error)
      setFormStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null)
  }

  const handleMobileNavClick = (page: string) => {
    setCurrentPage(page)
    handleMobileMenuClose()
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'white' }}>
      {/* Navigation */}
      <AppBar position="static" sx={{ backgroundColor: '#DC143C' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Box
              component="img"
              src="/images/44199895-3d11-4546-b8a9-c68287c8c018.jpg"
              alt="Upright HVAC Logo"
              sx={{
                height: 40,
                width: 'auto',
                mr: 2,
                cursor: 'pointer'
              }}
              onClick={() => setCurrentPage('home')}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: { xs: '1rem', sm: '1.25rem' }
              }}
              onClick={() => setCurrentPage('home')}
            >
              Upright HVAC
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button
              color="inherit"
              onClick={() => setCurrentPage('home')}
              sx={{ mr: 2, fontWeight: currentPage === 'home' ? 'bold' : 'normal' }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              onClick={() => setCurrentPage('contact')}
              sx={{ mr: 2, fontWeight: currentPage === 'contact' ? 'bold' : 'normal' }}
            >
              Contact
            </Button>
            <Button
              color="inherit"
              onClick={() => setCurrentPage('quote')}
              sx={{ fontWeight: currentPage === 'quote' ? 'bold' : 'normal' }}
            >
              Get Quote
            </Button>
          </Box>

          {/* Mobile Navigation */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              color="inherit"
              onClick={handleMobileMenuOpen}
              sx={{ p: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={mobileMenuAnchor}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleMobileMenuClose}
              sx={{
                '& .MuiPaper-root': {
                  backgroundColor: '#DC143C',
                  color: 'white'
                }
              }}
            >
              <MenuItem
                onClick={() => handleMobileNavClick('home')}
                sx={{
                  fontWeight: currentPage === 'home' ? 'bold' : 'normal',
                  '&:hover': { backgroundColor: '#FF4444' }
                }}
              >
                Home
              </MenuItem>
              <MenuItem
                onClick={() => handleMobileNavClick('contact')}
                sx={{
                  fontWeight: currentPage === 'contact' ? 'bold' : 'normal',
                  '&:hover': { backgroundColor: '#FF4444' }
                }}
              >
                Contact
              </MenuItem>
              <MenuItem
                onClick={() => handleMobileNavClick('quote')}
                sx={{
                  fontWeight: currentPage === 'quote' ? 'bold' : 'normal',
                  '&:hover': { backgroundColor: '#FF4444' }
                }}
              >
                Get Quote
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
      {currentPage === 'contact' && <ContactPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'quote' && (
        <QuotePage
          formData={formData}
          handleFormChange={handleFormChange}
          handleFormSubmit={handleFormSubmit}
          formStatus={formStatus}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Footer */}
      <Box sx={{ backgroundColor: '#DC143C', color: 'white', py: 4, mt: 'auto' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Upright HVAC
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Professional Heating & Air Conditioning Services
            </Typography>
          </Box>

          <Typography variant="body2" textAlign="center" sx={{ opacity: 0.8, mb: 1 }}>
            Denver, NC | <a href="tel:704-884-5165" style={{ color: 'inherit', textDecoration: 'none' }}>(704) 884-5165</a> | <a href="mailto:uprighthvac@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>uprighthvac@gmail.com</a>
          </Typography>
          <Typography variant="body2" textAlign="center" sx={{ opacity: 0.6, mt: 1 }}>
            Serving a 40-mile radius with quality HVAC solutions | Specializing in Trane Systems
          </Typography>
          <Typography variant="body2" textAlign="center" sx={{ opacity: 0.9, mt: 2, fontStyle: 'italic' }}>
            "Upright Service, Just-Right Comfort."
          </Typography>
          <Typography variant="body2" textAlign="center" sx={{ opacity: 0.8, mt: 1, fontSize: '0.75rem' }}>
            NC Licensed Contractor #36541
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}

export default App