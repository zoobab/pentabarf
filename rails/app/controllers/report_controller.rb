class ReportController < ApplicationController

  around_filter :check_current_conference
  before_filter :init
  around_filter :update_last_login

  REPORTS = [:arrived,:not_arrived,:pickup,:expenses,:feedback,:missing,:paper,:slides,:resources,:review]

  def index
  end

  REPORTS.each do | report |
    define_method( report ) do
      @content_title = "#{params[:action].capitalize} Report"
      @rows = "View_report_#{report}".constantize.select({:conference_id=>@current_conference.conference_id})
    end
  end

  def pickup
    @content_title = "Pickup Report"
    @rows = View_report_pickup.select(:conference_id=>@current_conference.conference_id,:translated=>POPE.user.current_language)
  end

  def review
    @content_title = "Review Report"
  end

  def review_filter
    conditions = {}
    conditions[:conference_id] = @current_conference.conference_id
    conditions[:translated] = POPE.user.current_language
    if params[:conference_track_id] != ""
      conditions[:conference_track_id] = params[:conference_track_id]
    end
    @events = View_report_review.select( conditions, {:order=>[:title,:subtitle]})
    @rated = Event_rating.select({:person_id=>POPE.user.person_id}).map{|r| r.event_id}
    @rated += Event_rating_remark.select({:person_id=>POPE.user.person_id}).map{|r| r.event_id}
    render(:partial=>'review_table')
  end

  protected

  def init
    @content_title = 'Reports'
    @current_conference = Conference.select_single(:conference_id => POPE.user.current_conference_id)
    @current_language = POPE.user.current_language
  end

  def check_permission
    POPE.conference_permission?('pentabarf::login', POPE.user.current_conference_id)
  end

end
