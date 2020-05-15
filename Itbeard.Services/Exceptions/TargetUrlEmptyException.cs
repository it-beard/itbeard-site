using System;

namespace Itbeard.Services.Exceptions
{
    public class TargetUrlEmptyException : Exception
    {
        public TargetUrlEmptyException(string msg) :base(msg) {}
    }
}