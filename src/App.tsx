import { useState } from 'react'
import { Container, AppBar, Toolbar, Typography, Button, Box, Card, CardContent, TextField, Alert } from '@mui/material'
import { Phone, Email, LocationOn, Home } from '@mui/icons-material'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    details: ''
  })
  const [formStatus, setFormStatus] = useState('')

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const subject = `Free HVAC Estimate Request from ${formData.name}`
    const body = `Name: ${formData.name}%0D%0APhone: ${formData.phone}%0D%0AEmail: ${formData.email}%0D%0A%0D%0ADetails:%0D%0A${formData.details}`

    window.location.href = `mailto:uprighthvac@gmail.com?subject=${subject}&body=${body}`

    setFormStatus('success')
    setFormData({ name: '', phone: '', email: '', details: '' })
  }

  const HomePage = () => (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'linear-gradient(rgba(139, 21, 56, 0.8), rgba(197, 60, 60, 0.8)), url("/src/images/e3fc3a8c-e076-4ec8-b176-cbb5d18d460d.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
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
              color: '#8B1538',
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
            Get Free Estimate
          </Button>
        </Container>
      </Box>

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ color: '#8B1538', mb: 6 }}>
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
              src="/src/images/4acd3e8e-2b0d-4114-9f68-0a7361227903.jpg"
              alt="Professional HVAC Installation"
              sx={{
                width: '100%',
                height: { xs: 150, md: 200 },
                objectFit: 'cover',
                borderRadius: 1,
                mb: 2
              }}
            />
            <CardContent>
              <Typography variant="h5" component="h3" gutterBottom sx={{ color: '#8B1538' }}>
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
              src="/src/images/406cc9d6-882d-481a-8a19-00fbd39bd2bf.jpg"
              alt="HVAC Equipment and Repairs"
              sx={{
                width: '100%',
                height: { xs: 150, md: 200 },
                objectFit: 'cover',
                borderRadius: 1,
                mb: 2
              }}
            />
            <CardContent>
              <Typography variant="h5" component="h3" gutterBottom sx={{ color: '#8B1538' }}>
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
              src="/src/images/ba0c4e26-b61e-4f60-a6dd-4f0e1eb2a11d.jpg"
              alt="HVAC Maintenance and Service"
              sx={{
                width: '100%',
                height: { xs: 150, md: 200 },
                objectFit: 'cover',
                borderRadius: 1,
                mb: 2
              }}
            />
            <CardContent>
              <Typography variant="h5" component="h3" gutterBottom sx={{ color: '#8B1538' }}>
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
              src="/src/images/dbd4bf63-be55-490e-9c37-4f71d0f89567.jpg"
              alt="Ductwork Installation and Repair"
              sx={{
                width: '100%',
                height: { xs: 150, md: 200 },
                objectFit: 'cover',
                borderRadius: 1,
                mb: 2
              }}
            />
            <CardContent>
              <Typography variant="h5" component="h3" gutterBottom sx={{ color: '#8B1538' }}>
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
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ color: '#8B1538', mb: 6 }}>
          Meet Reid Upright
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ flex: { xs: '1 1 100%', md: '0 0 300px' }, textAlign: 'center' }}>
            <Box
              component="img"
              src="/src/images/6d23a426-631e-4ab4-a7db-56bbd5ea5f34.jpg"
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
            <Typography variant="h4" gutterBottom sx={{ color: '#8B1538', mb: 3 }}>
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
              backgroundColor: '#8B1538',
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
              <Typography variant="body2" sx={{ color: '#8B1538', fontWeight: 'bold', textAlign: 'center' }}>
                NC Licensed Contractor #36541
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>


      {/* Why Choose Us Section */}
      <Box sx={{ backgroundColor: '#F5F5F5', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ color: '#8B1538', mb: 6 }}>
            Why Choose Upright HVAC?
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 400px' } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <LocationOn sx={{ fontSize: 40, color: '#C53C3C', mr: 2 }} />
                <Box>
                  <Typography variant="h6" sx={{ color: '#8B1538' }}>Local Denver, NC HVAC Experts</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Licensed HVAC contractor serving Lincoln County and surrounding areas with next-day emergency service
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 400px' } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Home sx={{ fontSize: 40, color: '#C53C3C', mr: 2 }} />
                <Box>
                  <Typography variant="h6" sx={{ color: '#8B1538' }}>Trane Authorized Dealer</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Professional AC repair, heating repair, and HVAC installation services you can trust for residential and commercial properties
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )

  const ContactPage = () => (
    <Box>
      {/* Contact Hero Section */}
      <Box
        sx={{
          backgroundImage: 'linear-gradient(rgba(139, 21, 56, 0.9), rgba(197, 60, 60, 0.9)), url("/src/images/fb6190f4-0758-4c74-bbca-5282ce871c79.jpg")',
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
          backgroundColor: '#C53C3C',
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
              color: '#C53C3C',
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
              background: 'linear-gradient(135deg, #8B1538 0%, #C53C3C 100%)',
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
              <Typography variant="h4" gutterBottom sx={{ color: '#8B1538', mb: 3 }}>
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
                      backgroundColor: '#8B1538',
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
                  backgroundColor: '#8B1538',
                  py: 1.5,
                  fontSize: '1.1rem',
                  '&:hover': {
                    backgroundColor: '#C53C3C',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(139, 21, 56, 0.4)'
                  }
                }}
              >
                Get Your Free Estimate Now
              </Button>
            </Card>
          </Box>
        </Box>

        {/* Why Choose Reid Section */}
        <Card sx={{ p: 4, mb: 6, backgroundColor: '#F8F9FA' }}>
          <Typography variant="h4" textAlign="center" gutterBottom sx={{ color: '#8B1538', mb: 4 }}>
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
                <Typography variant="h6" sx={{ color: '#8B1538', mb: 2, fontWeight: 'bold' }}>{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
              </Box>
            ))}
          </Box>
        </Card>

        {/* Final CTA */}
        <Box sx={{
          textAlign: 'center',
          p: 4,
          backgroundColor: '#8B1538',
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
                color: '#8B1538',
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

  const QuotePage = () => (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" textAlign="center" gutterBottom sx={{ color: '#8B1538', mb: 2 }}>
        Get Your Free HVAC Estimate
      </Typography>
      <Typography variant="h6" textAlign="center" sx={{ mb: 6, color: '#666' }}>
        Fill out the form below and Reid will get back to you with a personalized quote
      </Typography>

      {formStatus === 'success' && (
        <Alert severity="success" sx={{ mb: 4 }}>
          Thank you! Your request has been sent to Reid. He'll contact you soon!
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
              sx={{
                backgroundColor: '#8B1538',
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': {
                  backgroundColor: '#C53C3C',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(139, 21, 56, 0.4)'
                }
              }}
            >
              Send My Request
            </Button>
          </Box>
        </form>

        <Box sx={{ mt: 4, p: 3, backgroundColor: '#F8F9FA', borderRadius: 1 }}>
          <Typography variant="h6" sx={{ color: '#8B1538', mb: 2 }}>
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

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'white' }}>
      {/* Navigation */}
      <AppBar position="static" sx={{ backgroundColor: '#8B1538' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Box
              component="img"
              src="/src/images/44199895-3d11-4546-b8a9-c68287c8c018.jpg"
              alt="Upright HVAC Logo"
              sx={{
                height: 40,
                width: 'auto',
                mr: 2,
                cursor: 'pointer'
              }}
              onClick={() => setCurrentPage('home')}
            />
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setCurrentPage('home')}>
              Upright HVAC
            </Typography>
          </Box>
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
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'contact' && <ContactPage />}
      {currentPage === 'quote' && <QuotePage />}

      {/* Footer */}
      <Box sx={{ backgroundColor: '#8B1538', color: 'white', py: 4, mt: 'auto' }}>
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
