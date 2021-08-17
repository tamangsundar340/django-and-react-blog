from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
#
from rest_framework import routers
from core.clientapi import views

router = routers.DefaultRouter()
router.register("blog",views.BlogViewset, basename="blog")
router.register("category",views.CategoryViewSet, basename="category")
router.register("trendingblog",views.TrendingBlogViewSet, basename="trendingblog")
router.register("contact",views.ContactViewSet,basename="contact")
router.register("contactmessage", views.ContactMessageViewSet, basename="contactmessage")
router.register("youtubevideo",views.VideoCategoryViewSet, basename="youtubevideo")
router.register("videolist",views.VideoListViewSet, basename="videolist")
router.register("blogcomment",views.BlogCommentViewSet, basename="blogcomment")


urlpatterns = [
    path('admin/', admin.site.urls),
    path('adminapi/', include('core.adminapi.urls')),
    path('clientapi/', include(router.urls)),
    path('summernote/', include('django_summernote.urls')),
    path('api/', include('rest_framework.urls')),
]
urlpatterns = urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
