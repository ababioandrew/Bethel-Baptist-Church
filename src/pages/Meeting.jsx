
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import ShareMeetingInvite from '../components/ShareMeetingInvite';
import './Home.css';

export default function Meeting() {
  const GOOGLE_MEET_URL = "https://meet.google.com/cjb-fjhc-sdo"
  const startMeeting = () => {
    window.open(
      GOOGLE_MEET_URL,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div
      className="home"
      style={{
        padding: '40px 20px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
          flex: 1,
          width: '100%'
        }}
      >

        {/* Hero Content */}
        <p className="section-eyebrow">
          Live Video Conference
        </p>

        <h1 style={{
          color: '#0F172A',
          marginBottom: '10px'
        }}>
          Answered Prayer Network Meeting Room
        </h1>

        <p style={{
          color: '#64748B',
          marginBottom: '30px',
          fontSize: '1.1rem'
        }}>
          Join our live prayer meeting through Google Meet.
          Click the button below to enter the meeting.
          You can also share the meeting invitation with others.
        </p>

        {/* Google Meet Meeting Card */}
        <div style={{
          marginTop: '40px',
          padding: '40px 20px',
          background: '#F8FAFC',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
        }}>

          <div style={{
            fontSize: '55px',
            marginBottom: '15px'
          }}>
            🎥
          </div>

          <h2 style={{
            color: '#0F172A',
            marginBottom: '15px'
          }}>
            Google Meet Live Session
          </h2>

          <p style={{
            color: '#64748B',
            marginBottom: '25px'
          }}>
            Click below to start or join the Answered Prayer
            Network meeting in a new browser tab.
          </p>

          <button
            onClick={startMeeting}
            style={{
              padding: '16px 32px',
              background: '#C49A3A',
              color: '#0F172A',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(196, 154, 58, 0.3)',
              transition: 'transform 0.2s ease'
            }}
          >
            🎥 Start / Join Meeting
          </button>

          <p style={{
            color: '#64748B',
            fontSize: '0.85rem',
            marginTop: '20px'
          }}>
            Google Meet will open in a new browser tab.
          </p>
        </div>

        {/* Share Meeting Invitation */}
        <div style={{
          marginTop: '30px',
          padding: '25px',
          backgroundColor: '#F8FAFC',
          borderRadius: '12px',
          border: '1px solid #E2E8F0'
        }}>
          <h3 style={{
            color: '#0F172A',
            marginBottom: '15px'
          }}>
            Invite Others to This Meeting
          </h3>

          <ShareMeetingInvite meetingUrl={GOOGLE_MEET_URL} />
        </div>

        {/* Back to Home */}
        <div style={{ marginTop: '40px' }}>
          <Link
            to="/"
            style={{
              color: '#C49A3A',
              fontWeight: 'bold',
              textDecoration: 'none'
            }}
          >
            &larr; Back to Home
          </Link>
        </div>

      </div>

      <Footer />
    </div>
  );
}
