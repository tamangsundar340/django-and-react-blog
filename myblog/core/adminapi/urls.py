from core.models import Newsletter
from django.contrib import admin
from django.urls import path, include
from django.urls.resolvers import URLPattern

from .views import(
    # SiteAdmin
    SiteAdminListCreateView,
    SiteAdminUpdateDestroyView,
    # Member
    MemberListCreateView,
    MemberUpdateDestroyView,
    # SiteInformation
    SiteInformationListCreateView,
    SiteInformationUpdateDestroyView,
    # Category
    CategoryListCreateView,
    CategoryUpdateDestroyView,
    #Blog 
    BlogListCreateView,
    BlogUpdateDestroyView,
    #BlogComment
    BlogCommentListCreateView,
    BlogCommentUpdateDestroyView,
    # Lesson
    LessonListCreateView,
    LessonUpdateDestroyView,
    # Newsletter
    NewsletterListCreateView,
    NewsletterUpdateDestroyView
    
)


urlpatterns = [    
    # SiteAdmin
    path('siteadmin-createlist', SiteAdminListCreateView.as_view(), name='siteadmin-createlist'),
    path('siteadmin-destroyupdate/<str:pk>/', SiteAdminUpdateDestroyView.as_view(), name='siteadmin-destroyupdate'),
    # Member
    path('member-createlist', MemberListCreateView.as_view(), name='member-createlist'),
    path('member-destroyupdate/<str:pk>/', MemberUpdateDestroyView.as_view(), name='member-destroyupdate'),
    # SiteInformation
    path('siteinfo-createlist', SiteInformationListCreateView.as_view(), name='siteinfo-createlist'),
    path('siteinfo-destroyupdate/<str:pk>/', SiteInformationUpdateDestroyView.as_view(), name='siteinfo-destroyupdate'),
    # Category
    path('category-createlist', CategoryListCreateView.as_view(), name='category-createlist'),
    path('category-destroyupdate/<str:pk>/', CategoryUpdateDestroyView.as_view(), name='category-destroyupdate'),
    # Blog 
    path('blog-createlist', BlogListCreateView.as_view(), name='blog-createlist'),
    path('blog-destroyupdate/<str:pk>/', BlogUpdateDestroyView.as_view(), name='blog-destroyupdate'),
    # BlogComment
    path('blogcomment-createlist', BlogCommentListCreateView.as_view(), name='blogcomment-createlist'),
    path('blogcomment-destroyupdate/<str:pk>/', BlogCommentUpdateDestroyView.as_view(), name='blogcomment-destroyupdate'),
    # Lesson
    path('lesson-createlist', LessonListCreateView.as_view(), name='lesson-createlist'),
    path('lesson-destroyupdate/<str:pk>/', LessonUpdateDestroyView.as_view(), name='lesson-destroyupdate'),
    # Newsletter
    path('newsletter-createlist', NewsletterListCreateView.as_view(), name='newsletter-createlist'),
    path('newsletter-destroyupdate/<str:pk>/', NewsletterUpdateDestroyView.as_view(), name='newsletter-destroyupdate'),
]